import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerRequest, PlayerResponse } from '../../../../../shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-player-list-edit',
  templateUrl: './player-list-edit.component.html',
  styleUrls: ['./player-list-edit.component.scss'],
})
export class PlayerListEditComponent implements OnInit, OnDestroy {
  @Input() player!: PlayerResponse;
  isPlayerEdit = false;
  inputPlayer: FormControl<string> = new FormControl('', { nonNullable: true });
  private onDestroy$ = new Subject<boolean>();

  constructor(private playerSevice: PlayerService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  onEditClick() {
    this.inputPlayer.setValue(this.player.name);
    this.isPlayerEdit = true;
  }

  deletePlayer() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        status: '削除',
        text: '【注意】成績が登録されている場合は、プレイヤーを削除できません。',
        color: 'warn',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.playerSevice.deletePlayer(this.player.id);
        }
        this.isPlayerEdit = false;
      });
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
