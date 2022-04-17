import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss'],
})
export class LeagueListComponent implements OnInit {
  @Input('leagueList') leagueList!: string[];
  constructor() {}

  ngOnInit(): void {}
}
