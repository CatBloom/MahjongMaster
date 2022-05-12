import { Component, OnInit } from '@angular/core';
import { PlayerResultWrapper } from '../../shared/interfaces/result';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  playerName = '';
  totalGame = 0;
  totalPoint = 0;
  lineLabels: string[] = [];
  lineData: number[] = [];
  pieData: number[] = [];
  tableColumns: string[] = [];
  tableData: PlayerResultWrapper[] = [];
  constructor() {}

  ngOnInit(): void {
    this.playerName = 'catBloom';
    this.totalGame = 34;
    this.totalPoint = 200.5;
    this.lineLabels = [
      '2022/02/03/22:00',
      '2022/02/04/22:00',
      '2022/02/05/22:00',
      '2022/02/06/22:00',
      '2022/02/07/22:00',
      '2022/02/08/22:00',
      '2022/02/09/22:00',
      '2022/02/10/22:00',
      '2022/02/11/22:00',
      '2022/02/12/22:00',
    ];
    this.lineData = [1, 1, 3, 2, 4, 2, 3, 1, 4, 4];
    this.pieData = [10, 9, 8, 7];
    this.tableColumns = ['rank', 'result', 'createDate'];
    this.tableData = [
      {
        resultId: '0001',
        rank: 1,
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
        point: 40000,
        calcPoint: 40,
        createDate: new Date('Sat Apr 02 2022 22:00:00 GMT+0900 (日本標準時)'),
        group: 1,
        resultData: [
          {
            resultId: '0001',
            rank: 1,
            leagueId: '01',
            playerId: '01',
            playerName: 'catBloom',
            point: 40000,
            calcPoint: 40,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 2,
            leagueId: '01',
            playerId: '02',
            playerName: 'sample02',
            point: 30000,
            calcPoint: 30,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 3,
            leagueId: '01',
            playerId: '03',
            playerName: 'sample03',
            point: 20000,
            calcPoint: 20,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 4,
            leagueId: '01',
            playerId: '04',
            playerName: 'sample04',
            point: 10000,
            calcPoint: 10,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
        ],
      },
      {
        resultId: '0002',
        rank: 2,
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
        point: 20000,
        calcPoint: 30,
        createDate: new Date('Sat Apr 02 2022 23:00:00 GMT+0900 (日本標準時)'),
        group: 2,
        resultData: [
          {
            resultId: '0002',
            rank: 1,
            leagueId: '01',
            playerId: '04',
            playerName: 'sample04',
            point: 60000,
            calcPoint: 40,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 2,
            leagueId: '01',
            playerId: '01',
            playerName: 'catBloom',
            point: 25000,
            calcPoint: 30,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 3,
            leagueId: '01',
            playerId: '03',
            playerName: 'sample03',
            point: 20000,
            calcPoint: 20,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 4,
            leagueId: '01',
            playerId: '02',
            playerName: 'sample02',
            point: -5000,
            calcPoint: 10,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
        ],
      },
    ];
  }
}
