import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LeagueResultResponse } from '../../../../shared/interfaces/result';
import { GameResponse } from 'src/app/shared/interfaces/game';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() columns!: string[];
  @Input() set results(data: LeagueResultResponse[] | GameResponse[]) {
    if (data && data.length !== 0) {
      if (data.length > 10) {
        this.pageSizeOption = [10, data.length];
        this.pageSize = 10;
      } else {
        this.pageSizeOption = [data.length];
        this.pageSize = data.length;
      }
      this.dataSource = new MatTableDataSource<LeagueResultResponse | GameResponse>(data);
      this.dataSource.paginator = this.paginator;
    }
  }
  @Output() rowClickEvent = new EventEmitter<any>();

  dataSource: MatTableDataSource<LeagueResultResponse | GameResponse> = new MatTableDataSource();

  selection = new SelectionModel<unknown>(false);
  columnsToDisplay: string[] = [];
  pageSizeOption: number[] = [];
  pageSize = 10;
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.columnsToDisplay = this.columns;
  }

  rowClick(element: any) {
    this.selection.select(element);
    this.rowClickEvent.emit(element);
  }
}
