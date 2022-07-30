import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player.service';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  tableColumns: string[] = ['results', 'createdAt'];
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
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        distinctUntilChanged(),
        map((params: Params) => params['player-id'])
      )
      .subscribe((playerId) => {
        this.resultService.getPlayerResult(playerId);
        this.resultService.getPieData(playerId);
        this.resultService.getLineData(playerId);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
