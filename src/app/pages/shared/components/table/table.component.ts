import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultResponse, PlayerResultResponse, LeagueResultResponse } from '../../../../shared/interfaces/result';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns!: string[];
  @Input() clickOption?: 'playerLink' | 'updateResultLink';
  @Input() set results(data: ResultResponse[] | PlayerResultResponse[] | LeagueResultResponse[]) {
    this.dataSource = data;
  }
  selection = new SelectionModel<PlayerResultResponse>(false);
  columnsToDisplay: string[] = [];
  dataSource = [{}];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource = this.results;
    this.columnsToDisplay = this.columns;
  }

  goPlayerResult(element: LeagueResultResponse) {
    this.router.navigateByUrl(`/player/${element.leagueId}/${element.playerId}`);
  }

  goUpdateResult(element: PlayerResultResponse) {
    this.selection.select(element);
    this.router.navigateByUrl(`/result/update/${element.leagueId}/${element.id}`);
  }
}
