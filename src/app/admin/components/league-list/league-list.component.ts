import { Component, Input, OnInit } from '@angular/core';
import { LeagueResponse } from '../../../../shared/interfaces/league';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss'],
})
export class LeagueListComponent implements OnInit {
  @Input() leagueList!: LeagueResponse[];

  constructor() {}

  ngOnInit(): void {}
}
