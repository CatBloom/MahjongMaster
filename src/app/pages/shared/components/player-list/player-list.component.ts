import { Component, Input, OnInit } from '@angular/core';
import { PlayerResponse } from '../../../../shared/interfaces/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() players!: PlayerResponse[];

  constructor() {}

  ngOnInit(): void {}
}
