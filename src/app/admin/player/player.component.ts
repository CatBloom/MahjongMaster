import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
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
    name: new FormControl('', [Validators.required, Validators.pattern(/[\S]/)]),
  });
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  playerList$ = this.playerService.playerList$;
  matcher = new MyErrorStateMatcher();
  private onDestroy$ = new Subject<boolean>();

  constructor(private playerService: PlayerService, private activeRoute: ActivatedRoute, private router: Router) {}

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
    this.onDestroy$.next(true);
  }

  postPlayer() {
    if (this.formGroup.invalid) {
      return;
    }

    const player: PlayerRequest = {
      leagueId: String(this.activeRoute.snapshot.paramMap.get('league-id')),
      name: this.name.value.trim(),
    };
    this.playerService.postPlayer(player);
    this.name.reset();
  }

  movePage(value: string) {
    const id = String(this.activeRoute.snapshot.paramMap.get('league-id'));
    switch (value) {
      case 'game':
        this.router.navigateByUrl(`/admin/game/edit/${id}`);
        break;
      case 'details':
        this.router.navigateByUrl(`/details/${id}`);
        break;
    }
  }
}
