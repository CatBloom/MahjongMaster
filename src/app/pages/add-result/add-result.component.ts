import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rules } from '../../shared/interfaces/rules';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';
import { GameRequest, GameResponse, GamePlayers, GameResult } from 'src/app/shared/interfaces/game';
import { LeagueService } from 'src/app/shared/services/league.service';
import { GameService } from 'src/app/shared/services/game.service';
import { SnackService } from 'src/app/shared/services/snack.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  get resultArray() {
    return this.formGroup.get('resultArray') as FormArray;
  }
  //登録or更新
  formType: string | null = null;
  //取得したルール
  rules: Rules = {} as Rules;

  league$ = this.leagueService.league$;
  game$ = this.gameService.game$;
  gameList$ = this.gameService.gameList$;
  playerList$ = this.playerService.playerList$;
  tableColumns: string[] = ['results', 'createdAt'];
  matcher = new MyErrorStateMatcher();
  totalCheck = new FormControl<number | string>(0, { nonNullable: true });
  private game: GameResponse = {} as GameResponse;
  private pointSubscriptionsDestroy$ = new Subject<boolean>();
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private leagueService: LeagueService,
    private playerService: PlayerService,
    private gameService: GameService,
    private snackService: SnackService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private matDialog: MatDialog
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
          this.initFormCreate();
          this.pointSubscriptions();
          this.totalPointSubscription();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.pointSubscriptionsDestroy$.next(true);
  }

  //form作成
  initFormCreate() {
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.resultArray.push(
        this.fb.nonNullable.group({
          rank: [{ value: i + 1, disabled: true }, [Validators.required]],
          id: ['', [Validators.required]],
          point: ['', [Validators.required, Validators.pattern(/^[\d-]+$/)]],
          calcPoint: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[\d\-.]+$/)]],
        })
      );
    }
  }

  //formリセット
  resetForm() {
    this.formGroup.reset();
  }

  setValue(game: GameResponse) {
    //Todo 更新時の処理をtemplateで行いたいがselectBoxに値が入らないため関数で行う
    for (let i = 0; i < this.resultArray.length; i++) {
      this.resultArray.controls[i].get('rank')?.setValue(game.results[i].rank);
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
    const players: GamePlayers[] = [];
    for (let i = 0; i < this.rules.playerCount; i++) {
      result.push({
        rank: this.resultArray.controls[i].get('rank')?.value,
        playerId: this.resultArray.controls[i].get('id')?.value,
        point: Number(this.resultArray.controls[i].get('point')?.value),
        calcPoint: Number(this.resultArray.controls[i].get('calcPoint')?.value),
      });
      players.push({
        id: this.resultArray.controls[i].get('id')?.value,
      });
    }

    const games: GameRequest = {
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      results: result,
      players: players,
    };
    this.gameService.postGame(games);
    this.formGroup.reset();
  }

  //game更新
  putGame() {
    if (this.formGroup.invalid || this.checkValidation()) {
      return;
    }

    const result: GameResult[] = [];
    const players: GamePlayers[] = [];
    for (let i = 0; i < this.rules.playerCount; i++) {
      result.push({
        id: this.game.results[i].id,
        rank: this.resultArray.controls[i].get('rank')?.value,
        playerId: this.resultArray.controls[i].get('id')?.value,
        point: Number(this.resultArray.controls[i].get('point')?.value),
        calcPoint: Number(this.resultArray.controls[i].get('calcPoint')?.value),
        gameId: this.game.results[i].gameId,
      });
      players.push({
        id: this.resultArray.controls[i].get('id')?.value,
        gameId: this.game.id,
      });
    }

    const games: GameRequest = {
      id: this.game.id,
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      results: result,
      players: players,
    };

    this.gameService.updateGame(games);
  }

  deleteGame() {
    if (!this.game.id) {
      return;
    }
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        status: '削除',
        color: 'warn',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          const leagueId = String(this.activeRoute.snapshot.paramMap.get('league-id'));
          this.gameService.deleteGame(this.game.id, leagueId);
        }
      });
  }

  //Validation
  private checkValidation(): boolean {
    let totalPoint = 0;
    let prevPoint: number | null = null;
    let isCheckPoint = false;
    const playerArray: number[] = [];
    this.resultArray.controls.forEach((control) => {
      totalPoint += Number(control.get('point')?.value);
      playerArray.push(control.get('id')?.value);

      if (!prevPoint) {
        prevPoint = Number(control.get('point')?.value);
      } else {
        prevPoint >= Number(control.get('point')?.value)
          ? (prevPoint = Number(control.get('point')?.value))
          : (isCheckPoint = true);
      }
    });

    //合計点チェック
    if (totalPoint !== this.rules.startPoint * this.rules.playerCount) {
      this.snackService.openSnackBer('合計点が一致しません', '✖️');
      return true;
    }
    //playerの重複チェック
    const test = new Set(playerArray);
    if (test.size !== playerArray.length) {
      this.snackService.openSnackBer('playerが重複しています', '✖️');
      return true;
    }
    //点数の大きさ順をチェック
    if (isCheckPoint) {
      this.snackService.openSnackBer('不正な点数があります', '✖️');
      return true;
    }

    return false;
  }

  goPostPage() {
    const leagueId = String(this.activeRoute.snapshot.paramMap.get('league-id'));
    this.router.navigateByUrl(`/game/add/${leagueId}`);
  }

  tableRowClick(game: GameRequest) {
    this.router.navigateByUrl(`/game/update/${game.leagueId}/${game.id}`);
  }

  autoCalcPointCheck(check: boolean) {
    if (!check) {
      for (const control of this.resultArray.controls) {
        control.get('rank')?.enable();
        control.get('calcPoint')?.enable();
      }
      this.pointSubscriptionsDestroy$.next(true);
    } else {
      for (const control of this.resultArray.controls) {
        control.get('rank')?.reset();
        control.get('rank')?.disable();
        control.get('calcPoint')?.disable();
      }
      this.pointSubscriptions();
    }
  }

  //uma配列を作成
  private createUmaArray(): number[] {
    let umaArray: Array<number>;
    if (!this.rules.uma4) {
      umaArray = [this.rules.uma1, this.rules.uma2, this.rules.uma3];
    } else {
      umaArray = [this.rules.uma1, this.rules.uma2, this.rules.uma3, this.rules.uma4];
    }
    return umaArray;
  }

  //point自動計算用
  private pointSubscriptions() {
    const umaArray = this.createUmaArray();
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.resultArray.controls[i]
        .get('point')
        ?.valueChanges.pipe(takeUntil(this.pointSubscriptionsDestroy$))
        .subscribe(() => {
          const point = Number(this.resultArray.controls[i].get('point')?.value);
          const topPrize = (this.rules.returnPoint - this.rules.startPoint) * this.rules.playerCount;
          const calcPoint = point - this.rules.returnPoint + umaArray[i] * 1000;
          if (isNaN(calcPoint)) {
            return;
          } else if (this.resultArray.controls[i].get('point')?.value === '') {
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

  private totalPointSubscription() {
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.resultArray.controls[i]
        .get('point')
        ?.valueChanges.pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          let totalPoint = 0;
          this.resultArray.controls.forEach((control) => {
            const point = Number(control.get('point')?.value);
            if (isNaN(point)) {
              return;
            } else {
              totalPoint = totalPoint + point;
            }
          });
          this.rules.startPoint * this.rules.playerCount === totalPoint
            ? this.totalCheck.setValue(`✅ ${Math.floor(totalPoint)}`)
            : this.totalCheck.setValue(`❌ ${Math.floor(totalPoint)}`);
        });
    }
  }
}
