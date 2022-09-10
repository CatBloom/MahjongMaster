import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rules } from '../../interfaces/rules';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { GameRequest, GameResponse, GamePlayers, GameResult } from '../../interfaces/game';
import { LeagueService } from '../../services/league.service';
import { GameService } from '../../services/game.service';
import { SnackService } from '../../services/snack.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { LeagueResponse } from 'src/app/interfaces/league';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  get gameArray() {
    return this.formGroup.get('gameArray') as FormArray;
  }
  //登録or更新orNULL
  formType: 'post' | 'put' | null = null;
  //自動計算用のフラグ管理
  isAutoCalc = true;
  leagueList$ = this.leagueService.leagueList$;
  gameList$ = this.gameService.gameList$;
  playerList$ = this.playerService.playerList$;
  tableColumns: string[] = ['results', 'createdAt'];
  matcher = new MyErrorStateMatcher();
  selectLeague = new FormControl<LeagueResponse | null>(null);
  totalCheck = new FormControl<number | string>(0, { nonNullable: true });
  //取得したルール
  private rules: Rules = {} as Rules;
  //取得したゲーム(更新用)
  private game: GameResponse = {} as GameResponse;
  private league$ = this.leagueService.league$;
  private game$ = this.gameService.game$;
  private pointSubscriptionsDestroy$ = new Subject<boolean>();
  private totalPointSubscriptionsDestroy$ = new Subject<boolean>();
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
      gameArray: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.leagueService.getLeagueList();
    this.selectLeague.valueChanges.pipe(takeUntil(this.onDestroy$), distinctUntilChanged()).subscribe((league) => {
      if (!league) {
        return;
      }
      this.playerService.getPlayerList(league.id);
      this.gameService.getGameList(league.id);
      this.formType = 'post';
      this.rules = league.rules;
      this.totalCheck.reset();
      this.initFormCreate();
      this.pointSubscriptionsDestroy$.next(true);
      this.totalPointSubscriptionsDestroy$.next(true);
      this.pointSubscriptions();
      this.totalPointSubscription();
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
        this.playerService.getPlayerList(game.leagueId);
        this.leagueService.getLeague(game.leagueId);
      }
    });
    //ルールを取得
    this.league$.pipe(takeUntil(this.onDestroy$)).subscribe((league) => {
      this.rules = league.rules;
      this.initFormCreate();
      this.pointSubscriptionsDestroy$.next(true);
      this.totalPointSubscriptionsDestroy$.next(true);
      this.pointSubscriptions();
      this.totalPointSubscription();
      this.setValue(this.game);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.pointSubscriptionsDestroy$.next(true);
    this.totalPointSubscriptionsDestroy$.next(true);
  }

  //form作成
  initFormCreate() {
    //formを初期化
    this.formGroup = this.fb.group({
      gameArray: this.fb.array([]),
    });
    //参加人数の数だけformを作成
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.gameArray.push(
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

  //取得ゲームをformにセット
  private setValue(game: GameResponse) {
    const rankArray: number[] = [];
    this.gameArray.controls.forEach((control, i) => {
      control.get('rank')?.setValue(game.results[i].rank);
      rankArray.push(game.results[i].rank);
      control.get('id')?.setValue(game.results[i].playerId);
      control.get('point')?.setValue(game.results[i].point);
      control.get('calcPoint')?.setValue(game.results[i].calcPoint);
    });
    //rankに重複があったら自動計算をオフにする
    const rankArraySet = new Set(rankArray);
    if (rankArraySet.size !== rankArray.length) {
      this.isAutoCalc = false;
      this.autoCalcPointCheck(false);
    }
  }

  //game登録
  postGame() {
    if (this.formGroup.invalid || this.checkValidation() || !this.selectLeague.value) {
      return;
    }
    const result: GameResult[] = [];
    const players: GamePlayers[] = [];
    for (let i = 0; i < this.rules.playerCount; i++) {
      result.push({
        rank: this.gameArray.controls[i].get('rank')?.value,
        playerId: this.gameArray.controls[i].get('id')?.value,
        point: Number(this.gameArray.controls[i].get('point')?.value),
        calcPoint: Number(this.gameArray.controls[i].get('calcPoint')?.value),
      });
      players.push({
        id: this.gameArray.controls[i].get('id')?.value,
      });
    }
    const games: GameRequest = {
      leagueId: this.selectLeague.value.id,
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
        rank: this.gameArray.controls[i].get('rank')?.value,
        playerId: this.gameArray.controls[i].get('id')?.value,
        point: Number(this.gameArray.controls[i].get('point')?.value),
        calcPoint: Number(this.gameArray.controls[i].get('calcPoint')?.value),
        gameId: this.game.results[i].gameId,
      });
      players.push({
        id: this.gameArray.controls[i].get('id')?.value,
        gameId: this.game.id,
      });
    }
    const games: GameRequest = {
      id: this.game.id,
      leagueId: this.game.leagueId,
      results: result,
      players: players,
    };
    this.gameService.updateGame(games);
  }

  //game削除
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
          this.gameService.deleteGame(this.game.id);
        }
      });
  }

  //Validation
  private checkValidation(): boolean {
    let totalPoint = 0;
    let calcTotalPoint = 0;
    let prevPoint: number | null = null;
    let isCheckPoint = false;
    const playerArray: number[] = [];
    this.gameArray.controls.forEach((control) => {
      totalPoint += Number(control.get('point')?.value);
      calcTotalPoint += Number(control.get('calcPoint')?.value) * 1000;
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
    //順位点合計チェック
    if (calcTotalPoint !== 0) {
      this.snackService.openSnackBer('順位点合計が一致しません', '✖️');
      return true;
    }
    //playerの重複チェック
    const playerArraySet = new Set(playerArray);
    if (playerArraySet.size !== playerArray.length) {
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

  tableRowClick(game: GameRequest) {
    this.router.navigate(['/admin/game/edit/', game.id]);
  }

  //自動計算の切替
  autoCalcPointCheck(check: boolean) {
    if (!check) {
      for (const control of this.gameArray.controls) {
        control.get('rank')?.enable();
        control.get('calcPoint')?.enable();
      }
      this.pointSubscriptionsDestroy$.next(true);
    } else {
      for (const control of this.gameArray.controls) {
        control.get('rank')?.reset();
        control.get('point')?.reset();
        control.get('calcPoint')?.reset();
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
      this.gameArray.controls[i]
        .get('point')
        ?.valueChanges.pipe(takeUntil(this.pointSubscriptionsDestroy$))
        .subscribe(() => {
          const point = Number(this.gameArray.controls[i].get('point')?.value);
          const topPrize = (this.rules.returnPoint - this.rules.startPoint) * this.rules.playerCount;
          const calcPoint = point - this.rules.returnPoint + umaArray[i] * 1000;
          if (isNaN(calcPoint)) {
            return;
          } else if (!this.gameArray.controls[i].get('point')?.value) {
            this.gameArray.controls[i].get('calcPoint')?.setValue('');
          } else {
            if (i === 0) {
              const setPoint = Math.floor(((calcPoint + topPrize) / 1000) * 10) / 10;
              this.gameArray.controls[i].get('calcPoint')?.setValue(setPoint);
            } else {
              const setPoint = Math.floor((calcPoint / 1000) * 10) / 10;
              this.gameArray.controls[i].get('calcPoint')?.setValue(setPoint);
            }
          }
        });
    }
  }

  //合計点チェック用
  private totalPointSubscription() {
    for (let i = 0; i < this.rules.playerCount; i++) {
      this.gameArray.controls[i]
        .get('point')
        ?.valueChanges.pipe(takeUntil(this.totalPointSubscriptionsDestroy$))
        .subscribe(() => {
          let totalPoint = 0;
          this.gameArray.controls.forEach((control) => {
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
