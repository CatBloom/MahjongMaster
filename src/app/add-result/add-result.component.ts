import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rules } from '../shared/interfaces/rules';
import { RulesService } from '../shared/services/rules.service';
import { ResultService } from '../shared/services/result.service';

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
    playerPoint1: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint2: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint3: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint4: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    calcPoint1: new FormControl('', []),
    calcPoint2: new FormControl('', []),
    calcPoint3: new FormControl('', []),
    calcPoint4: new FormControl('', []),
  });

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

  private subscriptions = new Subscription();

  constructor(
    private rulesService: RulesService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRules();
    this.pointSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getRules() {
    let leagueId = this.activeRoute.snapshot.paramMap.get('league-id');
    if (!leagueId) {
      return;
    } else {
      this.rulesService.getRules(leagueId).subscribe((rules) => {
        this.rules = rules;
      });
    }
  }

  private pointCheck() {
    let point1 = Number(this.formGroup.get('playerPoint1')!.value);
    let point2 = Number(this.formGroup.get('playerPoint2')!.value);
    let point3 = Number(this.formGroup.get('playerPoint3')!.value);
    let point4 = Number(this.formGroup.get('playerPoint4')!.value);
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
    this.subscriptions.add(
      this.formGroup.get('playerPoint1')!.valueChanges.subscribe(() => {
        let point: number = Number(this.formGroup.get('playerPoint1')!.value);
        let topPrize = ((this.rules.inputReturnPoint - this.rules.inputStartPoint) * 4) / 1000;
        let setPoint = this.calcPoint(point, this.rules.inputUma1) + topPrize;
        if (isNaN(setPoint)) {
          this.formGroup.get('calcPoint1')!.setValue('');
        } else {
          this.formGroup.get('calcPoint1')!.setValue(setPoint);
        }
      })
    );
    // player2の点数を変換
    this.subscriptions.add(
      this.formGroup.get('playerPoint2')!.valueChanges.subscribe(() => {
        let point = Number(this.formGroup.get('playerPoint2')!.value);
        let setPoint = this.calcPoint(point, this.rules.inputUma2);
        if (isNaN(setPoint)) {
          this.formGroup.get('calcPoint2')!.setValue('');
        } else {
          this.formGroup.get('calcPoint2')!.setValue(setPoint);
        }
      })
    );
    // player3の点数を変換
    this.subscriptions.add(
      this.formGroup.get('playerPoint3')!.valueChanges.subscribe(() => {
        let point = Number(this.formGroup.get('playerPoint3')!.value);
        let setPoint = this.calcPoint(point, this.rules.inputUma3);
        if (isNaN(setPoint)) {
          this.formGroup.get('calcPoint3')!.setValue('');
        } else {
          this.formGroup.get('calcPoint3')!.setValue(setPoint);
        }
      })
    );
    // player4の点数を変換
    this.subscriptions.add(
      this.formGroup.get('playerPoint4')!.valueChanges.subscribe(() => {
        let point = Number(this.formGroup.get('playerPoint4')!.value);
        let setPoint = this.calcPoint(point, this.rules.inputUma4);
        if (isNaN(setPoint)) {
          this.formGroup.get('calcPoint4')!.setValue('');
        } else {
          this.formGroup.get('calcPoint4')!.setValue(setPoint);
        }
      })
    );
  }
}
