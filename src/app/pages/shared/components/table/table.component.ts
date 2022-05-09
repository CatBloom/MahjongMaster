import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PlayerResult, PlayerResultWrapper, LeagueResult } from '../../../../shared/interfaces/result';

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
  @Input() columns!: string[];
  @Input() results!: PlayerResultWrapper[] | LeagueResult[];
  dataSource = [{}];
  columnsToDisplay: string[] = [];
  expandedElement?: PlayerResult | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns;
    this.dataSource = this.results;
  }

  goPlayerResult(playerId: string) {
    this.router.navigateByUrl(`/player/${playerId}`);
  }
}
