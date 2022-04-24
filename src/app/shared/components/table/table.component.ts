import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Result } from '../../interfaces/result';

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
  @Input('columns') columns!: string[];
  @Input('results') results!: ResultTableWrapper[];
  dataSource = [{}];
  columnsToDisplay: string[] = [];
  expandedElement?: ResultTable | null;

  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource = this.results;
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
