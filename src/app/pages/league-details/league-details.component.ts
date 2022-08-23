import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeagueService } from 'src/app/shared/services/league.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResultService } from 'src/app/shared/services/result.service';
import { LeagueResultResponse } from 'src/app/shared/interfaces/result';
@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  league$ = this.leagueService.league$;
  leagueResult$ = this.resultService.leagueResult$;
  tableColumns: string[] = ['rank', 'name', 'totalGame', 'totalCalcPoint', 'averageRank'];
  isRules = false;
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private leagueService: LeagueService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['league-id']),
        distinctUntilChanged()
      )
      .subscribe((leagueId) => {
        this.leagueService.getLeague(leagueId);
        this.resultService.getLeagueResult(leagueId);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  tableRowClick(rowData: LeagueResultResponse) {
    const lid = rowData.leagueId;
    const pid = rowData.playerId;
    this.router.navigateByUrl(`/player/${lid}/${pid}`);
  }
}
