import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  tableColumns: string[] = ['results', 'createdAt'];
  playerResult$ = this.resultService.playerResult$;
  lineData$ = this.resultService.lineData$;
  pieData$ = this.resultService.pieData$;
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private resultService: ResultService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private title: Title
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

    //タイトル変更
    this.playerResult$.pipe(takeUntil(this.onDestroy$)).subscribe((playerResult) => {
      this.title.setTitle(`${playerResult.name} | 雀Tools`);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  movePage() {
    const id = String(this.activeRoute.snapshot.paramMap.get('league-id'));
    this.router.navigateByUrl(`/details/${id}`);
  }
}
