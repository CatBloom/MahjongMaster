import { Component, OnInit, OnDestroy } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LeagueService } from 'src/app/shared/services/league.service';

@Component({
  selector: 'app-admin-my-league',
  templateUrl: './admin-my-league.component.html',
  styleUrls: ['./admin-my-league.component.scss'],
})
export class AdminMyLeagueComponent implements OnInit, OnDestroy {
  iconFileCirclePlus = faFileCirclePlus;
  leagueList$ = this.leagueService.leagueList$;
  user$ = this.auth.user;
  private onDestroy$ = new Subject();

  constructor(private leagueService: LeagueService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user$.pipe(distinctUntilChanged(), takeUntil(this.onDestroy$)).subscribe((user) => {
      if (!user) {
        return;
      } else {
        this.leagueService.getLeagueList(user.uid);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
