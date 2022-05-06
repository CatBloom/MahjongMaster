import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerList } from 'src/app/shared/interfaces/player';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  formGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required]),
  });
  playerList: PlayerList[] = [];
  // playerList$ = this.playerService.player$;

  constructor(private playerService: PlayerService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // apiからデータを取得
    // const leagueId = this.activeRoute.snapshot.paramMap.get('league-id');
    // if (!leagueId) {
    //   return;
    // } else {
    //   this.playerService.getPlayerList(leagueId);
    // }

    // sampleData
    this.playerList = [
      {
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
      },
      {
        leagueId: '01',
        playerId: '02',
        playerName: 'player2',
      },
      {
        leagueId: '01',
        playerId: '03',
        playerName: 'player3',
      },
      {
        leagueId: '01',
        playerId: '04',
        playerName: 'player4',
      },
      {
        leagueId: '01',
        playerId: '05',
        playerName: 'player5',
      },
    ];
  }
}
