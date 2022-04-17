import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-my-league',
  templateUrl: './admin-my-league.component.html',
  styleUrls: ['./admin-my-league.component.scss'],
})
export class AdminMyLeagueComponent implements OnInit {
  leagueList: string[] = ['sampleLeague1', 'sampleLeague2', 'sampleLeague3', 'sampleLeague4'];

  constructor() {}

  ngOnInit(): void {}
}
