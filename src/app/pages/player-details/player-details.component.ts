import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  tableColumns: string[] = ['rank', 'result', 'createDate'];
  player$ = this.playerService.player$;
  playerResult$ = this.resultService.playerResult$;
  lineData$ = this.resultService.lineData$;
  pieData$ = this.resultService.pieData$;
  private onDestroy$ = new Subject();

  constructor(
    private playerService: PlayerService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$), distinctUntilChanged()).subscribe((prams) => {
      this.playerService.getPlayer(prams['league-id'], prams['player-id']);
      this.resultService.getPlayerResult(prams['league-id'], prams['player-id']);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
