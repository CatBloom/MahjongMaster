import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, PlayerList } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'http://localhost:3000'; //バックエンドにアクセスするURL
  private playerSubject = new BehaviorSubject<PlayerList[]>([]);

  constructor(private http: HttpClient) {}

  get player$() {
    return this.playerSubject.asObservable();
  }

  // playerListを取得
  getPlayerList(leagueId: string): void {
    this.http
      .get<{ data: PlayerList[] }>(`${this.apiUrl}/${leagueId}`)
      .pipe(
        map((res) => {
          return res.data;
        })
      )
      .subscribe((playerList) => {
        this.playerSubject.next(playerList);
      });
  }

  // player登録
  postPlayer(player: Player): void {
    this.http
      .post<{ data: PlayerList }>(`${this.apiUrl}`, player)
      .pipe(
        map((res) => {
          return res.data;
        })
      )
      .subscribe(
        (playerList) => {
          this.getPlayerList(playerList.playerId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // playerName更新
  updatePlayer(editPlayerList: PlayerList): void {
    this.http.put(`${this.apiUrl}`, editPlayerList).pipe();
  }

  // player削除
  deletePlayer(playerList: PlayerList): void {
    this.http.delete(`${this.apiUrl}/${playerList.leagueId}/${playerList.playerId}`).pipe();
  }
}
