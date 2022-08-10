import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Rules } from '../../shared/interfaces/rules';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';
import { GameRequest, GameResponse, GamePlayers, GameResult } from 'src/app/shared/interfaces/game';
import { LeagueService } from 'src/app/shared/services/league.service';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({});

  get resultArray() {
    return this.formGroup.get('resultArray') as FormArray;
  }
  //form作成時の初期値を保存
  formInitValue = [];
  //登録or更新
  formType: string | null = null;
  //取得したルール
  rules: Rules = {} as Rules;
  //取得したゲーム

  league$ = this.leagueService.league$;
  game$ = this.gameService.game$;
  gameList$ = this.gameService.gameList$;
  playerList$ = this.playerService.playerList$;
  tableColumns: string[] = ['results', 'createdAt'];
  matcher = new MyErrorStateMatcher();
  private game: GameResponse = {} as GameResponse;
  private umaArray: number[] = [];
  private onDestroy$ = new Subject();

  constructor(
    private leagueService: LeagueService,
    private playerService: PlayerService,
    private gameService: GameService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      resultArray: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['league-id']),
        distinctUntilChanged()
      )
      .subscribe((leagueId: string) => {
        this.leagueService.getLeague(leagueId);
        this.playerService.getPlayerList(leagueId);
        this.gameService.getGameList(leagueId);
      });

    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['game-id']),
        distinctUntilChanged()
      )
      .subscribe((gameId) => {
        if (gameId !== undefined) {
          this.gameService.getGame(gameId);
          this.formType = 'put';
        } else {
          this.formType = null;
        }
      });

    //ゲームを取得
    this.game$.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      if (game.id) {
        this.game = game;
        this.setValue(game);
      }
    });

    //リーグルールを取得
    this.league$
      .pipe(
        takeUntil(this.onDestroy$),
        //idを比較し、同値の場合subscribeしない
        distinctUntilChanged((pre, cur) => {
          // pre === curでは比較できない
          return pre.id === cur.id;
        })
      )
      .subscribe((league) => {
        if (league.rules) {
          this.rules = league.rules;
          this.createUmaArray();
          this.initFormCreate();
          this.pointSubscriptions();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  //form作成
  initFormCreate() {
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.resultArray.push(
        this.fb.group({
          rank: [i + 1, [Validators.required]],
          id: ['', [Validators.required]],
          point: ['', [Validators.required, Validators.pattern(/^[\d-]+$/)]],
          calcPoint: ['', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]],
        })
      );
    }
    //reset用formの初期値を保存する
    this.formInitValue = this.formGroup.value;
  }

  //formリセット
  resetForm() {
    this.formGroup.reset(this.formInitValue);
  }

  setValue(game: GameResponse) {
    //Todo 更新時の処理をtemplateで行いたいがselectBoxに値が入らないため関数で行う
    for (let i = 0; i < this.resultArray.length; i++) {
      this.resultArray.controls[i].get('id')?.setValue(game.results[i].playerId);
      this.resultArray.controls[i].get('point')?.setValue(game.results[i].point);
      this.resultArray.controls[i].get('calcPoint')?.setValue(game.results[i].calcPoint);
    }
  }

  submitGame() {
    if (!this.formType) {
      this.postGame();
    } else {
      this.putGame();
    }
  }

  //game登録
  postGame() {
    if (this.formGroup.invalid || this.checkValidation()) {
      return;
    }

    const result: GameResult[] = [];

    for (let i = 0; i < this.rules.playerCount; i++) {
      result.push({
        rank: this.resultArray.controls[i].get('rank')?.value,
        playerId: this.resultArray.controls[i].get('id')?.value,
        point: Number(this.resultArray.controls[i].get('point')?.value),
      });
    }

    const players: GamePlayers[] = [];
    for (let i = 0; i < this.rules.playerCount; i++) {
      players.push({
        id: this.resultArray.controls[i].get('id')?.value,
      });
    }

    const games: GameRequest = {
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      results: result,
      players: players,
      rules: this.rules,
    };

    this.gameService.postGame(games);
  }

  //game更新
  putGame() {
    if (this.formGroup.invalid || this.checkValidation()) {
      return;
    }

    const result: GameResult[] = [];

    for (let i = 0; i < this.rules.playerCount; i++) {
      result.push({
        id: this.game.results[i].id,
        rank: this.resultArray.controls[i].get('rank')?.value,
        playerId: this.resultArray.controls[i].get('id')?.value,
        point: Number(this.resultArray.controls[i].get('point')?.value),
        calcPoint: Number(this.resultArray.controls[i].get('calcPoint')?.value),
        gameId: this.game.results[i].gameId,
      });
    }

    const players: GamePlayers[] = [];
    for (let i = 0; i < this.rules.playerCount; i++) {
      players.push({
        id: this.resultArray.controls[i].get('id')?.value,
        gameId: this.game.id,
      });
    }

    const games: GameRequest = {
      id: Number(this.activeRoute.snapshot.paramMap.get('game-id')),
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      results: result,
      players: players,
      rules: this.rules,
    };

    this.gameService.updateGame(games);
  }

  //Validation
  private checkValidation(): boolean {
    //playerの重複を検索
    for (let i = 0; i < this.resultArray.controls.length; i++) {
      const cur = this.resultArray.controls[i].get('id')?.value;
      for (let j = 0; j < this.resultArray.controls.length; j++) {
        if (i !== j) {
          if (cur === this.resultArray.controls[j].get('id')?.value) {
            return true;
          }
        }
      }
    }

    // const point1 = Number(this.resultArray.controls[0].get('point')?.value);
    // const point2 = Number(this.resultArray.controls[1].get('point')?.value);
    // const point3 = Number(this.resultArray.controls[2].get('point')?.value);
    // const point4 = Number(this.resultArray.controls[3].get('point')?.value);

    // if (point1 + point2 + point3 + point4 !== this.rules.startPoint * this.rules.playerCount) {
    //   return true;
    // }
    //Todo 大きさの順番を比較
    // if (point1 < point2 || point2 < point3 || point3 < point4) {
    //   return false;
    // }

    return false;
  }

  setTestData() {
    const user: number[] = [1, 2, 3, 4, 5, 6, 7];
    const point: number[] = [40000, 30000, 20000, 10000];
    for (let i = 0; i < user.length; i++) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = user[i];
      user[i] = user[r];
      user[r] = tmp;
    }

    for (let i = 0; i < this.resultArray.controls.length; i++) {
      this.resultArray.controls[i].get('id')?.setValue(user[i]);
      this.resultArray.controls[i].get('point')?.setValue(point[i]);
    }
  }

  //uma配列を作成
  private createUmaArray() {
    if (!this.rules.uma4) {
      this.umaArray = [this.rules.uma1, this.rules.uma2, this.rules.uma3];
    } else {
      this.umaArray = [this.rules.uma1, this.rules.uma2, this.rules.uma3, this.rules.uma4];
    }
  }

  //point自動計算用
  private pointSubscriptions() {
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.resultArray.controls[i]
        .get('point')
        ?.valueChanges.pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          const point = Number(this.resultArray.controls[i].get('point')?.value);
          const topPrize = (this.rules.returnPoint - this.rules.startPoint) * this.rules.playerCount;
          const calcPoint = point - this.rules.returnPoint + this.umaArray[i] * 1000;

          if (isNaN(calcPoint) || this.resultArray.controls[i].get('point')?.value === '') {
            this.resultArray.controls[i].get('calcPoint')?.setValue('');
          } else {
            if (i === 0) {
              const setPoint = Math.floor(((calcPoint + topPrize) / 1000) * 10) / 10;
              this.resultArray.controls[i].get('calcPoint')?.setValue(setPoint);
            } else {
              const setPoint = Math.floor((calcPoint / 1000) * 10) / 10;
              this.resultArray.controls[i].get('calcPoint')?.setValue(setPoint);
            }
          }
        });
    }
  }
}
