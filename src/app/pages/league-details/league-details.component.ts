import { Component, OnInit } from '@angular/core';
import { Rules } from '../../shared/interfaces/rules';
import { LeagueResult } from '../../shared/interfaces/result';
@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailsComponent implements OnInit {
  leagueName = '';
  leagueAdminName = '';
  leagueManual = '';
  leagueTotalGame = 0;
  leagueStartAt: Date = new Date();
  leagueFnishAt: Date = new Date();
  tableColumns: string[] = [];
  tableData: LeagueResult[] = [];
  isRules = false;
  rules: Rules = {
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

  constructor() {}

  ngOnInit(): void {
    this.leagueName = 'catBloomLeague';
    this.leagueAdminName = 'catBloom';
    this.leagueTotalGame = 200;
    this.leagueManual =
      '大会の説明 Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum saepe praesentium quaerat ipsa deserunt totam, provident placeat aliquam';
    this.leagueStartAt = new Date('Sat Apr 04 2022 22:00:00 GMT+0900 (日本標準時)');
    this.leagueFnishAt = new Date('Sat Apr 30 2022 22:00:00 GMT+0900 (日本標準時)');
    this.tableColumns = ['rank', 'playerName', 'totalGameCount', 'totalCalcPoint', 'date'];
    this.tableData = [
      {
        rank: '1位',
        playerId: '01',
        playerName: 'CatBloom',
        totalGameCount: 34,
        totalCalcPoint: 200.5,
        date: new Date('Sat Apr 30 2022 22:00:00 GMT+0900 (日本標準時)'),
      },
      {
        rank: '2位',
        playerId: '02',
        playerName: 'sample02',
        totalGameCount: 34,
        totalCalcPoint: 190.5,
        date: new Date('Sat Apr 30 2022 22:00:00 GMT+0900 (日本標準時)'),
      },
      {
        rank: '3位',
        playerId: '03',
        playerName: 'sample03',
        totalGameCount: 34,
        totalCalcPoint: -15,
        date: new Date('Sat Apr 30 2022 22:00:00 GMT+0900 (日本標準時)'),
      },
      {
        rank: '4位',
        playerId: '04',
        playerName: 'sample04',
        totalGameCount: 34,
        totalCalcPoint: -100,
        date: new Date('Sat Apr 30 2022 22:00:00 GMT+0900 (日本標準時)'),
      },
    ];
    this.rules = {
      radioGame: '2',
      radioDora: '2',
      radioTanyao: '2',
      radioTime: '3',
      inputStartPoint: 25000,
      inputFinishPoint: 30000,
      inputReturnPoint: 25000,
      inputCalledPoint: 0,
      inputReachPoint: 1000,
      inputDeposit: 300,
      inputPenalty1: 1000,
      inputPenalty2: 1500,
      inputPenalty3: 3000,
      inputUma1: 10,
      inputUma2: 5,
      inputUma3: -5,
      inputUma4: -10,
    };
  }
}
