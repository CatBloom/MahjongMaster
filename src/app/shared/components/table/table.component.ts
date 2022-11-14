import { Component, Input, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { LeagueResultResponse } from '../../../interfaces/result';
import { GameResponse } from '../../../interfaces/game';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild('table') table!: MatTable<LeagueResultResponse[] | GameResponse[]>;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columns!: string[];
  @Input() clickOption?: boolean = false;
  @Input() set results(data: LeagueResultResponse[] | GameResponse[]) {
    this.dataSource.data = data;
  }
  @Output() rowClickEvent = new EventEmitter<any>();

  dataSource = new MatTableDataSource<LeagueResultResponse | GameResponse>();
  columnsToDisplay: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  rowClick(element: any) {
    this.rowClickEvent.emit(element);
  }
}
