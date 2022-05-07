import { Component, OnInit } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { LeagueDataset } from '../../shared/interfaces/league';

@Component({
  selector: 'app-admin-my-league',
  templateUrl: './admin-my-league.component.html',
  styleUrls: ['./admin-my-league.component.scss'],
})
export class AdminMyLeagueComponent implements OnInit {
  iconFileCirclePlus = faFileCirclePlus;
  leagueList: LeagueDataset[] = [];

  constructor() {}

  ngOnInit(): void {
    //sampleData
    this.leagueList = [
      {
        leagueId: '01',
        leagueName: 'catBloomLeague',
      },
      {
        leagueId: '02',
        leagueName: 'sampleLeague02',
      },
      {
        leagueId: '03',
        leagueName: 'sampleLeague03',
      },
    ];
  }
}
