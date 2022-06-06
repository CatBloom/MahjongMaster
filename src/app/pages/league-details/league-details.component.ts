import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeagueService } from 'src/app/shared/services/league.service';
import { RulesService } from 'src/app/shared/services/rules.service';
import { ActivatedRoute, Params } from '@angular/router';
import { distinctUntilChanged, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResultService } from 'src/app/shared/services/result.service';
@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  league$ = this.leagueService.league$;
  rules$ = this.rulesService.rules$;
  leagueResult$ = this.resultService.leagueResult$;
  tableColumns: string[] = ['rank', 'playerName', 'playerGameCount', 'playerCalcPoint'];
  isRules = false;
  private onDestroy$ = new Subject();

  constructor(
    private leagueService: LeagueService,
    private rulesService: RulesService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute
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
        this.rulesService.getRules(leagueId);
        this.resultService.getLeagueResult(leagueId);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
