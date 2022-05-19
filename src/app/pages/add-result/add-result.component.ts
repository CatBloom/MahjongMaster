import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Rules } from '../../shared/interfaces/rules';
import { RulesService } from '../../shared/services/rules.service';
import { ResultService } from '../../shared/services/result.service';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    playerName1: new FormControl('', [Validators.required]),
    playerName2: new FormControl('', [Validators.required]),
    playerName3: new FormControl('', [Validators.required]),
    playerName4: new FormControl('', [Validators.required]),
    playerPoint1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint4: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    calcPoint1: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint2: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint3: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint4: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
  });
  get playerName1() {
    return this.formGroup.get('playerName1') as FormControl;
  }
  get playerName2() {
    return this.formGroup.get('playerName2') as FormControl;
  }
  get playerName3() {
    return this.formGroup.get('playerName3') as FormControl;
  }
  get playerName4() {
    return this.formGroup.get('playerName4') as FormControl;
  }
  get playerPoint1() {
    return this.formGroup.get('playerPoint1') as FormControl;
  }
  get playerPoint2() {
    return this.formGroup.get('playerPoint2') as FormControl;
  }
  get playerPoint3() {
    return this.formGroup.get('playerPoint3') as FormControl;
  }
  get playerPoint4() {
    return this.formGroup.get('playerPoint4') as FormControl;
  }
  get calcPoint1() {
    return this.formGroup.get('calcPoint1') as FormControl;
  }
  get calcPoint2() {
    return this.formGroup.get('calcPoint2') as FormControl;
  }
  get calcPoint3() {
    return this.formGroup.get('calcPoint3') as FormControl;
  }
  get calcPoint4() {
    return this.formGroup.get('calcPoint4') as FormControl;
  }
  // 取得したルール
  rules: Rules = {
    radioGame: '',
    radioDora: '',
    radioTanyao: '',
    radioTime: '',
    inputStartPoint: 0,
    inputFinishPoint: 0,
    inputReturnPoint: 0,
    inputCalledPoint: 0,
    inputReachPoint: 0,
    inputDeposit: 0,
    inputPenalty1: 0,
    inputPenalty2: 0,
    inputPenalty3: 0,
    inputUma1: 0,
    inputUma2: 0,
    inputUma3: 0,
    inputUma4: 0,
  };
  result$ = this.resultService.allResult$;
  rules$ = this.rulesService.rules$;
  players$ = this.playerService.players$;
  tableColumns: string[] = ['result', 'createDate'];
  private onDestroy$ = new Subject();

  constructor(
    private playerService: PlayerService,
    private rulesService: RulesService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pointSubscriptions();
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['league-id']),
        distinctUntilChanged()
      )
      .subscribe((leagueId) => {
        this.playerService.getPlayerList(leagueId);
        this.rulesService.getRules(leagueId);
        this.resultService.getAllResult(leagueId);
      });
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['result-id']),
        distinctUntilChanged()
      )
      .subscribe((resultId) => {
        if (resultId !== undefined) {
          this.selectResult(resultId);
        }
      });
    this.rules$.pipe(takeUntil(this.onDestroy$)).subscribe((rules: Rules) => {
      this.rules = rules;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  selectResult(resultId: number) {
    this.result$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      const selectData = data.find((element) => {
        return element.id == resultId;
      });
      this.playerName1.setValue(selectData?.resultData[0].playerId);
    });
  }

  private pointCheck() {
    const point1 = Number(this.playerPoint1.value);
    const point2 = Number(this.playerPoint2.value);
    const point3 = Number(this.playerPoint3.value);
    const point4 = Number(this.playerPoint4.value);
    if (point1 + point2 + point3 + point4 === this.rules.inputStartPoint * 4) {
      console.log('ok');
      return true;
    } else {
      console.log('error');
      return false;
    }
  }

  private calcPoint(point: number, uma: number) {
    return (point - this.rules.inputReturnPoint) / 1000 + uma;
  }

  private pointSubscriptions() {
    // player1の点数を変換
    this.playerPoint1.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint1.value);
      const topPrize = ((this.rules.inputReturnPoint - this.rules.inputStartPoint) * 4) / 1000;
      const setPoint = this.calcPoint(point, this.rules.inputUma1) + topPrize;
      if (isNaN(setPoint)) {
        this.calcPoint1.setValue('');
      } else {
        this.calcPoint1.setValue(setPoint);
      }
    });
    // player2の点数を変換
    this.playerPoint2.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint2.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma2);
      if (isNaN(setPoint)) {
        this.calcPoint2.setValue('');
      } else {
        this.calcPoint2.setValue(setPoint);
      }
    });
    // player3の点数を変換
    this.playerPoint3.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint3.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma3);
      if (isNaN(setPoint)) {
        this.calcPoint3.setValue('');
      } else {
        this.calcPoint3.setValue(setPoint);
      }
    });
    // player4の点数を変換
    this.playerPoint4.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint4.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma4);
      if (isNaN(setPoint)) {
        this.calcPoint4.setValue('');
      } else {
        this.calcPoint4.setValue(setPoint);
      }
    });
  }
}
