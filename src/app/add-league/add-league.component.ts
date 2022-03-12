import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../shared/interfaces/rules';
import { LeagueService } from '../shared/services/league.service';
import { RulesService } from '../shared/services/rules.service';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.scss'],
})
export class AddLeagueComponent implements OnInit {
  formGroup = new FormGroup({
    leagueInput: new FormControl('', [Validators.required]),
    rulesRadio: new FormControl('', [Validators.required]),
  });

  // カスタムルール(ユーザーが選択したものを格納)
  costomRules: Rules = {
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

  constructor(private leagueService: LeagueService, private rulesService: RulesService) {}

  ngOnInit(): void {}

  setCostomRules(costomRules: Rules) {
    this.costomRules = costomRules;
    console.log(this.costomRules);
  }
}
