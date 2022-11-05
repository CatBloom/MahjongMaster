import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LeagueService } from '../../services/league.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResultService } from '../../services/result.service';
import { LeagueResultResponse } from '../../interfaces/result';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailsComponent implements OnInit, OnDestroy {
  league$ = this.leagueService.league$;
  user$ = this.authService.user$;
  leagueResult$ = this.resultService.leagueResult$;
  tableColumns: string[] = ['rank', 'name', 'totalGame', 'totalCalcPoint', 'averageRank'];
  isRules = false;
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private leagueService: LeagueService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private title: Title
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

    //タイトル変更
    this.league$.pipe(takeUntil(this.onDestroy$)).subscribe((league) => {
      this.title.setTitle(`${league.name} | 雀Tools`);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  tableRowClick(rowData: LeagueResultResponse) {
    const lid = rowData.leagueId;
    const pid = rowData.playerId;
    this.router.navigateByUrl(`/details/${lid}/${pid}`);
  }
}
