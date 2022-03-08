import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() {}

  ngOnInit(): void {}
}
