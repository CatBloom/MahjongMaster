import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input('results') results!: ResultTableWrapper[];
  dataSource = sampleData;
  columnsToDisplay: string[] = ['rank', 'point', 'calcPoint', 'date'];
  expandedElement?: ResultTable | null;

  constructor() {}

  ngOnInit(): void {
    // this.dataSource = this.results;
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

// sampleデータ
const sampleData: ResultTableWrapper[] = [
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
