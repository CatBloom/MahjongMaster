import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LeagueService } from '../services/league.service';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

interface Links {
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  links: Links[] = [
    { label: '大会一覧', path: '/admin/league/list' },
    { label: '大会登録', path: '/admin/league/add' },
    { label: 'プレイヤー管理', path: '/admin/player/edit' },
    { label: '成績管理', path: '/admin/game/edit' },
    { label: 'ヘルプ', path: '/admin/help' },
  ];
  private onDestroy$ = new Subject<boolean>();

  constructor(private leagueService: LeagueService, private title: Title, private authService: AuthService) {}

  ngOnInit(): void {
    this.leagueService.getLeagueList();
    //タイトル変更
    this.authService.user$.pipe(takeUntil(this.onDestroy$)).subscribe((user) => {
      if (user) {
        this.title.setTitle(`${user.displayName} | 雀Tools`);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
