import { OnInit, Component } from '@angular/core';
import { LeagueService } from 'src/app/shared/services/league.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  search$ = this.leagueService.leagueSearchSubject$;
  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {}

  leagueSearch(value: string) {
    this.leagueService.searchLeague(value);
  }
}
