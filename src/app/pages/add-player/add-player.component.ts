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
    name: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  playerList$ = this.playerService.playerList$;
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

    //Todo input空白時にErrorを返す

    const player: PlayerRequest = {
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      name: this.name.value.trim(),
    };
    this.playerService.postPlayer(player);
    this.name.reset();
  }
}
