import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LeagueResponse } from 'src/app/interfaces/league';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-league-list-edit',
  templateUrl: './league-list-edit.component.html',
  styleUrls: ['./league-list-edit.component.scss'],
})
export class LeagueListEditComponent implements OnInit, OnDestroy {
  @Input() league!: LeagueResponse;

  private onDestroy$ = new Subject<boolean>();

  constructor(private leagueService: LeagueService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  deleteLeague() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        status: '削除',
        text: '【注意】大会を削除すると復元することはできません。',
        color: 'warn',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.leagueService.deleteLeague(this.league.id);
        }
      });
  }
}
