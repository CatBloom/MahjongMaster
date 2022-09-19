import { Component, OnInit } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-my-league',
  templateUrl: './my-league.component.html',
  styleUrls: ['./my-league.component.scss'],
})
export class MyLeagueComponent implements OnInit {
  iconFileCirclePlus = faFileCirclePlus;
  leagueList$ = this.leagueService.leagueList$;
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {}
}
