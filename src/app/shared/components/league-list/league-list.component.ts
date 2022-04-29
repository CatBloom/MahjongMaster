import { Component, Input, OnInit } from '@angular/core';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss'],
})
export class LeagueListComponent implements OnInit {
  @Input() leagueList!: string[];

  iconSquareCaretRight = faSquareCaretRight;

  constructor() {}

  ngOnInit(): void {}
}
