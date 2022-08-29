import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LeagueResultResponse } from '../../../../shared/interfaces/result';
import { GameResponse } from 'src/app/shared/interfaces/game';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('table') table!: MatTable<LeagueResultResponse[] | GameResponse[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columns!: string[];
  @Input() clickOption?: boolean = false;
  @Input() set results(data: LeagueResultResponse[] | GameResponse[]) {
    if (data) {
      this.len = data.length;
    }
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @Output() rowClickEvent = new EventEmitter<any>();

  len = 0;
  dataSource = new MatTableDataSource<LeagueResultResponse | GameResponse>();
  columnsToDisplay: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowClick(element: any) {
    this.rowClickEvent.emit(element);
  }
}
