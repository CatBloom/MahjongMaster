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
  };

  constructor(private leagueService: LeagueService, private rulesService: RulesService) {}

  ngOnInit(): void {}

  setCostomRules(costomRules: Rules) {
    this.costomRules = costomRules;
    console.log(this.costomRules);
  }
}
