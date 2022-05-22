import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { PlayerRequest } from 'src/app/shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required]),
  });
  get playerName() {
    return this.formGroup.get('playerName') as FormControl;
  }
  players$ = this.playerService.players$;
  matcher = new MyErrorStateMatcher();
  private onDestroy$ = new Subject();

  constructor(private playerService: PlayerService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['league-id']),
        distinctUntilChanged()
      )
      .subscribe((leagueId) => {
        this.playerService.getPlayerList(leagueId);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  postPlayer() {
    if (this.formGroup.invalid) {
      return;
    }
    const player: PlayerRequest = {
      leagueId: Number(this.activeRoute.snapshot.paramMap.get('league-id')),
      playerName: this.playerName.value,
    };
    this.playerService.postPlayer(player);
    this.playerName.reset();
  }
}
