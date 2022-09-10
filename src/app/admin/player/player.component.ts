import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LeagueResponse } from 'src/app/interfaces/league';
import { LeagueService } from 'src/app/services/league.service';
import { PlayerRequest } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/[\S]/), Validators.maxLength(10)],
    }),
  });
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  selectLeague = new FormControl<LeagueResponse | null>(null);
  leagueList$ = this.leagueService.leagueList$;
  playerList$ = this.playerService.playerList$;
  matcher = new MyErrorStateMatcher();
  private onDestroy$ = new Subject<boolean>();

  constructor(private leagueService: LeagueService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.leagueService.getLeagueList();
    this.selectLeague.valueChanges.pipe(takeUntil(this.onDestroy$), distinctUntilChanged()).subscribe((league) => {
      if (!league) {
        return;
      }
      this.playerService.getPlayerList(league.id);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  postPlayer() {
    if (this.formGroup.invalid || !this.selectLeague.value) {
      return;
    }
    const player: PlayerRequest = {
      leagueId: this.selectLeague.value.id,
      name: this.name.value.trim(),
    };
    this.playerService.postPlayer(player);
    this.name.reset();
  }
}
