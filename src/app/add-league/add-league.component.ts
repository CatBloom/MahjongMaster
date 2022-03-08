import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeagueService } from '../shared/services/league.service';

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
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {}
}
