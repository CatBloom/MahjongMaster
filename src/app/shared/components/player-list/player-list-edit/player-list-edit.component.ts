import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerList } from '../../../../shared/interfaces/player';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit {
  @Input() playerList!: PlayerList;
  isPlayerEdit = false;
  inputPlayer: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  onEditClick() {
    this.inputPlayer.setValue(this.playerList.playerName);
    this.isPlayerEdit = true;
  }

  onSaveClick() {
    if (this.inputPlayer.value !== this.playerList.playerName) {
      console.log(this.playerList.playerId);
      console.log(this.inputPlayer.value);
    }
    this.isPlayerEdit = false;
  }
}
