import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../shared/interfaces/rules';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
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
  ngOnInit(): void {}
}
