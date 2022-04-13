import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rules } from '../../interfaces/rules';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  @Input('rules') rules?: Rules;
  @Input('rulesRadioValue') rulesRadioValue?: string;
  @Output() sendRules = new EventEmitter<Rules>();

  // 雀魂公式ルール
  readonly mahjongsoulRules: Rules = {
    radioGame: '2',
    radioDora: '2',
    radioTanyao: '2',
    radioTime: '3',
    inputStartPoint: 25000,
    inputFinishPoint: 30000,
    inputReturnPoint: 25000,
    inputCalledPoint: 0,
    inputReachPoint: 1000,
    inputDeposit: 300,
    inputPenalty1: 1000,
    inputPenalty2: 1500,
    inputPenalty3: 3000,
    inputUma1: 10,
    inputUma2: 5,
    inputUma3: -5,
    inputUma4: -10,
  };
  // 天鳳公式ルール
  readonly tenhouRules: Rules = {
    radioGame: '2',
    radioDora: '2',
    radioTanyao: '2',
    radioTime: '2',
    inputStartPoint: 25000,
    inputFinishPoint: 30000,
    inputReturnPoint: 30000,
    inputCalledPoint: 0,
    inputReachPoint: 1000,
    inputDeposit: 300,
    inputPenalty1: 1000,
    inputPenalty2: 1500,
    inputPenalty3: 3000,
    inputUma1: 20,
    inputUma2: 10,
    inputUma3: -10,
    inputUma4: -20,
  };

  // 詳細ルール表示用のフォームコントロール
  isAdvanced = new FormControl(false);

  formGroup = new FormGroup({
    radioGame: new FormControl('', [Validators.required]),
    radioDora: new FormControl('', [Validators.required]),
    radioTanyao: new FormControl('', [Validators.required]),
    radioTime: new FormControl('', [Validators.required]),
    inputStartPoint: new FormControl(25000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputFinishPoint: new FormControl(30000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputReturnPoint: new FormControl(25000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputCalledPoint: new FormControl(0, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputReachPoint: new FormControl(1000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputDeposit: new FormControl(300, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputPenalty1: new FormControl(1000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputPenalty2: new FormControl(1500, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputPenalty3: new FormControl(3000, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputUma1: new FormControl(10, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputUma2: new FormControl(5, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputUma3: new FormControl(-5, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
    inputUma4: new FormControl(-10, [Validators.required, Validators.pattern(/^[\d\-]+$/)]),
  });

  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.setRules();
    this.sendRules.emit(this.formGroup.value);
    this.subscriptions = this.formGroup.valueChanges.subscribe(() => {
      if (!this.formGroup.invalid) {
        this.sendRules.emit(this.formGroup.value);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // 固定ルールをセットする関数
  setRules() {
    let rulesName: string;
    if (this.rules) {
      rulesName = 'rules';
    } else {
      rulesName = this.rulesRadioValue!;
    }
    if (rulesName && rulesName !== 'custom') {
      for (let control in this.formGroup.controls) {
        this.formGroup.get(control)!.setValue((this as any)[rulesName][control]);
      }
      if (!this.rules) {
        this.formGroup.disable(); // 入力を無効化する
      }
    }
  }
}
