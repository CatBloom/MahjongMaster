import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, PlayerDataset } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'http://localhost:3000'; //バックエンドにアクセスするURL
  private playersSubject = new BehaviorSubject<PlayerDataset[]>([]);

  constructor(private http: HttpClient) {}

  get players$() {
    return this.playersSubject.asObservable();
  }

  // playerListを取得
  getPlayerList(leagueId: string): void {
    this.http
      .get<{ data: PlayerDataset[] }>(`${this.apiUrl}/${leagueId}`)
      .pipe(
        map((res) => {
          return res.data;
        })
      )
      .subscribe((players) => {
        this.playersSubject.next(players);
      });
  }

  // player登録
  postPlayer(player: Player): void {
    this.http
      .post<{ data: PlayerDataset }>(`${this.apiUrl}`, player)
      .pipe(
        map((res) => {
          return res.data;
        })
      )
      .subscribe(
        (player) => {
          this.getPlayerList(player.leagueId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // playerName更新
  updatePlayer(editPlayerData: PlayerDataset): void {
    this.http.put(`${this.apiUrl}`, editPlayerData).pipe();
  }

  // player削除
  deletePlayer(playerData: PlayerDataset): void {
    this.http.delete(`${this.apiUrl}/${playerData.leagueId}/${playerData.playerId}`).pipe();
  }
}
