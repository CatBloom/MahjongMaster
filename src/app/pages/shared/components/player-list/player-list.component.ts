import { Component, Input, OnInit } from '@angular/core';
import { PlayerDataset } from '../../../shared/interfaces/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() players!: PlayerDataset[];

  constructor() {}

  ngOnInit(): void {}
}
