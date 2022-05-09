import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerDataset } from '../../../../../shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit {
  @Input() player!: PlayerDataset;
  isPlayerEdit = false;
  inputPlayer: FormControl = new FormControl();

  constructor(private playerSevice: PlayerService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.inputPlayer.setValue(this.player.playerName);
    this.isPlayerEdit = true;
  }

  onDeleteClick() {
    const playerData: PlayerDataset = {
      leagueId: this.player.leagueId,
      playerId: this.player.playerId,
      playerName: this.player.playerName,
    };
    this.playerSevice.deletePlayer(playerData);
    this.isPlayerEdit = false;
  }

  onSaveClick() {
    if (this.inputPlayer.value !== this.player.playerName) {
      const editData: PlayerDataset = {
        leagueId: this.player.leagueId,
        playerId: this.player.playerId,
        playerName: this.inputPlayer.value,
      };
      this.playerSevice.updatePlayer(editData);
    }
    this.isPlayerEdit = false;
  }
}
