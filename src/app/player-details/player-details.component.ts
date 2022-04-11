import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  playerName: string = '';
  lineLabels: string[] = [];
  lineData: number[] = [];
  pieData: number[] = [];
  tableData: ResultTableWrapper[] = [];
  constructor() {}

  ngOnInit(): void {
    this.playerName = 'catBloom';
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
    this.tableData = [
      {
        rank: '1位',
        point: 40000,
        calcPoint: 40,
        date: new Date('Sat Apr 02 2022 22:00:00 GMT+0900 (日本標準時)'),
        group: 1,
        resultData: [
          { rank: '1位', point: 40000, calcPoint: 40, date: new Date('2020/02/02'), group: 1 },
          { rank: '2位', point: 30000, calcPoint: 30, date: new Date('2020/02/02'), group: 1 },
          { rank: '3位', point: 20000, calcPoint: 20, date: new Date('2020/02/02'), group: 1 },
          { rank: '4位', point: 10000, calcPoint: 10, date: new Date('2020/02/02'), group: 1 },
        ],
      },
      {
        rank: '2位',
        point: 20000,
        calcPoint: 30,
        date: new Date('Sat Apr 02 2022 23:00:00 GMT+0900 (日本標準時)'),
        group: 2,
        resultData: [
          { rank: '1位', point: 60000, calcPoint: 40, date: new Date('2020/02/03'), group: 2 },
          { rank: '2位', point: 25000, calcPoint: 30, date: new Date('2020/02/03'), group: 2 },
          { rank: '3位', point: 20000, calcPoint: 20, date: new Date('2020/02/03'), group: 2 },
          { rank: '4位', point: -5000, calcPoint: 10, date: new Date('2020/02/03'), group: 2 },
        ],
      },
    ];
  }
}

interface ResultTable {
  rank: string;
  point: number;
  calcPoint: number;
  date: Date;
  group: number;
}
interface ResultTableWrapper extends ResultTable {
  resultData: ResultTable[];
}
