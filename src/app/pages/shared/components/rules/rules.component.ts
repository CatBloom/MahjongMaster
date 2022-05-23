import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Rules } from '../../../../shared/interfaces/rules';
import { MahjongSoulRules, TenhouRules } from '../../constants/const-rules';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  // 雀魂公式ルール
  mahjongsoulRules: Rules = MahjongSoulRules;
  // 天鳳公式ルール
  tenhouRules: Rules = TenhouRules;

  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get rulesRadio() {
    return this.formGroup.get('rulesRadio') as FormControl;
  }
  get radioGame() {
    return this.rulesGroup.get('radioGame') as FormControl;
  }
  get inputStartPoint() {
    return this.rulesGroup.get('inputStartPoint') as FormControl;
  }
  get inputFinishPoint() {
    return this.rulesGroup.get('inputFinishPoint') as FormControl;
  }
  get inputReturnPoint() {
    return this.rulesGroup.get('inputReturnPoint') as FormControl;
  }
  get inputCalledPoint() {
    return this.rulesGroup.get('inputCalledPoint') as FormControl;
  }
  get inputReachPoint() {
    return this.rulesGroup.get('inputReachPoint') as FormControl;
  }
  get inputDeposit() {
    return this.rulesGroup.get('inputDeposit') as FormControl;
  }
  get inputPenalty1() {
    return this.rulesGroup.get('inputPenalty1') as FormControl;
  }
  get inputPenalty2() {
    return this.rulesGroup.get('inputPenalty2') as FormControl;
  }
  get inputPenalty3() {
    return this.rulesGroup.get('inputPenalty3') as FormControl;
  }
  get inputUma1() {
    return this.rulesGroup.get('inputUma1') as FormControl;
  }
  get inputUma2() {
    return this.rulesGroup.get('inputUma2') as FormControl;
  }
  get inputUma3() {
    return this.rulesGroup.get('inputUma3') as FormControl;
  }
  get inputUma4() {
    return this.rulesGroup.get('inputUma4') as FormControl;
  }

  // 詳細ルール表示用のフォームコントロール
  isAdvanced = new FormControl(false);
  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.setRules();
    this.rulesRadio.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.rulesGroup.reset();
      this.setRules();
    });
    // 4人麻雀と3人麻雀で必須項目を切り替える
    this.radioGame.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.radioGame.value === '1' || this.radioGame.value === '2') {
        this.inputPenalty3.setErrors({ require: true });
        this.inputUma4.setErrors({ require: true });
      } else if (this.radioGame.value === '3' || this.radioGame.value === '4') {
        this.inputPenalty3.setErrors(null);
        this.inputUma4.setErrors(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  // 固定ルールをセットする関数
  setRules() {
    if (this.rulesRadio.value !== 'custom') {
      const rulesName = this.rulesRadio.value;
      for (const control in this.rulesGroup.controls) {
        this.rulesGroup.get(control)?.setValue((this as never)[rulesName][control]);
      }
      this.rulesGroup.disable();
    } else {
      this.rulesGroup.enable();
    }
  }
}
