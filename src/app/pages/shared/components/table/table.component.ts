import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  @Input() clickOption?: 'playerLink' | 'select';
  @Output() clickEvent = new EventEmitter<PlayerResultWrapper>();

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

  clickRow(element: PlayerResultWrapper) {
    this.selection.select(element);
    this.clickEvent.emit(element);
  }
}
