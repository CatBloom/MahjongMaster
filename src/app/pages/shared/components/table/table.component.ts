import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerResultWrapper, LeagueResult } from '../../../../shared/interfaces/result';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns!: string[];
  @Input() results!: PlayerResultWrapper[] | LeagueResult[];
  @Input() clickOption?: 'playerLink' | 'updateResultLink';

  selection = new SelectionModel<PlayerResultWrapper>(false);

  dataSource = [{}];
  columnsToDisplay: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource = this.results;
  }

  goPlayerResult(playerId: string) {
    this.router.navigateByUrl(`/player/${playerId}`);
  }

  goUpdateResult(element: PlayerResultWrapper) {
    this.selection.select(element);
    this.router.navigateByUrl(`/add-result/${element.leagueId}/${element.resultId}`);
  }
}
