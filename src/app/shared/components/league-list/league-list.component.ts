import { Component, Input, OnInit } from '@angular/core';
import { LeagueDataset } from '../../interfaces/league';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss'],
})
export class LeagueListComponent implements OnInit {
  @Input() leagueList!: LeagueDataset[];

  constructor() {}

  ngOnInit(): void {}
}
