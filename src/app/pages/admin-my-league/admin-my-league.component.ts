import { Component, OnInit } from '@angular/core';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-my-league',
  templateUrl: './admin-my-league.component.html',
  styleUrls: ['./admin-my-league.component.scss'],
})
export class AdminMyLeagueComponent implements OnInit {
  iconFileCirclePlus = faFileCirclePlus;
  leagueList: string[] = ['sampleLeague1', 'sampleLeague2', 'sampleLeague3', 'sampleLeague4'];

  constructor() {}

  ngOnInit(): void {}
}
