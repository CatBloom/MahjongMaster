import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerList } from '../../../interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit {
  @Input() playerList!: PlayerList;
  isPlayerEdit = false;
  inputPlayer: FormControl = new FormControl();

  constructor(private playerSevice: PlayerService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.inputPlayer.setValue(this.playerList.playerName);
    this.isPlayerEdit = true;
  }

  onDeleteClick() {
    const playerList: PlayerList = {
      leagueId: this.playerList.leagueId,
      playerId: this.playerList.playerId,
      playerName: this.playerList.playerName,
    };
    this.playerSevice.deletePlayer(playerList);
    this.isPlayerEdit = false;
  }

  onSaveClick() {
    if (this.inputPlayer.value !== this.playerList.playerName) {
      const editData: PlayerList = {
        leagueId: this.playerList.leagueId,
        playerId: this.playerList.playerId,
        playerName: this.inputPlayer.value,
      };
      this.playerSevice.updatePlayer(editData);
    }
    this.isPlayerEdit = false;
  }
}
