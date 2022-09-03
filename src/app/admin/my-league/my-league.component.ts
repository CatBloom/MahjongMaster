import { Component, OnInit } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-admin-my-league',
  templateUrl: './admin-my-league.component.html',
  styleUrls: ['./admin-my-league.component.scss'],
})
export class AdminMyLeagueComponent implements OnInit {
  iconFileCirclePlus = faFileCirclePlus;
  leagueList$ = this.leagueService.leagueList$;
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.leagueService.getLeagueList();
  }
}
