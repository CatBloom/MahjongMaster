import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerRequest, PlayerResponse } from '../../../../../shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit {
  @Input() player!: PlayerResponse;
  isPlayerEdit = false;
  inputPlayer: FormControl<string> = new FormControl('', { nonNullable: true });

  constructor(private playerSevice: PlayerService) {}

  ngOnInit(): void {}

  onEditClick() {
    this.inputPlayer.setValue(this.player.name);
    this.isPlayerEdit = true;
  }

  deletePlayer() {
    this.playerSevice.deletePlayer(this.player.id);
    this.isPlayerEdit = false;
  }

  updatePlayer() {
    if (this.inputPlayer.value !== this.player.name) {
      const updatePlayerData: PlayerRequest = {
        id: this.player.id,
        leagueId: this.player.leagueId,
        name: this.inputPlayer.value,
      };
      this.playerSevice.updatePlayer(updatePlayerData);
    }
    this.isPlayerEdit = false;
  }
}
