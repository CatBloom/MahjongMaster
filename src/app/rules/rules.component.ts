import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../shared/interfaces/rules';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  @Input('rulesRadioValue') rulesRadioValue?: string;
  // 雀魂公式ルール
  readonly mahjongsoulRules: Rules = {
    radioGame: '2',
    radioDora: '2',
    radioTanyao: '2',
    radioTime: '3',
  };
  // 天鳳公式ルール
  readonly tenhouRules: Rules = {
    radioGame: '2',
    radioDora: '2',
    radioTanyao: '2',
    radioTime: '2',
  };
  constructor() {}
  formGroup = new FormGroup({
    radioGame: new FormControl('', [Validators.required]),
    radioDora: new FormControl('', [Validators.required]),
    radioTanyao: new FormControl('', [Validators.required]),
    radioTime: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.setRules();
  }

  // 固定ルールをセットする関数
  setRules() {
    let rules = this.rulesRadioValue;
    if (rules && rules !== 'custom') {
      for (let control in this.formGroup.controls) {
        this.formGroup.get(control)!.setValue((this as any)[rules][control]);
      }
      this.formGroup.disable(); // 入力を無効化する
    }
  }
}
