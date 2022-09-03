import { Component, Input, OnInit } from '@angular/core';
import { GameResponse } from '../../../interfaces/game';

@Component({
  selector: 'app-table-result-row',
  templateUrl: './table-result-row.component.html',
  styleUrls: ['./table-result-row.component.scss'],
})
export class TableResultRowComponent implements OnInit {
  @Input() result!: GameResponse;

  constructor() {}

  ngOnInit(): void {}
}
