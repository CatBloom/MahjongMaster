import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LeagueResultResponse } from '../../../../shared/interfaces/result';
import { GameResponse } from 'src/app/shared/interfaces/game';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('table') table!: MatTable<LeagueResultResponse[] | GameResponse[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() columns!: string[];
  @Input() set results(data: LeagueResultResponse[] | GameResponse[]) {
    if (data) {
      this.len = data.length;
    }
    this.dataSource.data = [...data];
    this.dataSource.paginator = this.paginator;
  }
  @Output() rowClickEvent = new EventEmitter<any>();

  len = 0;
  dataSource = new MatTableDataSource<LeagueResultResponse | GameResponse>();
  selection = new SelectionModel<unknown>(false);
  columnsToDisplay: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource.paginator = this.paginator;
  }

  rowClick(element: any) {
    this.rowClickEvent.emit(element);
  }
}
