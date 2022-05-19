import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerResponse } from '../../../../../shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit {
  @Input() player!: PlayerResponse;
  isPlayerEdit = false;
  inputPlayer: FormControl = new FormControl();

  constructor(private playerSevice: PlayerService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.inputPlayer.setValue(this.player.playerName);
    this.isPlayerEdit = true;
  }

  deletePlayer() {
    this.playerSevice.deletePlayer(this.player.leagueId, this.player.id);
    this.isPlayerEdit = false;
  }

  updatePlayer() {
    if (this.inputPlayer.value !== this.player.playerName) {
      const updatePlayerData: PlayerResponse = {
        id: this.player.id,
        leagueId: this.player.leagueId,
        playerName: this.inputPlayer.value,
      };
      this.playerSevice.updatePlayer(updatePlayerData);
    }
    this.isPlayerEdit = false;
  }
}
