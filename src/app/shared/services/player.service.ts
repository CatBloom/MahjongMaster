import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerRequest, PlayerResponse } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly mockUrl = 'api/player';
  private playerSubject = new BehaviorSubject<PlayerResponse>({} as PlayerResponse);
  private playersSubject = new BehaviorSubject<PlayerResponse[]>([]);
  get player$() {
    return this.playerSubject.asObservable();
  }
  get players$() {
    return this.playersSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  //playerListを取得
  getPlayerList(leagueId: number): void {
    this.http
      .get<PlayerResponse[]>(`${this.mockUrl}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((players) => {
        this.playersSubject.next(players);
      });
  }

  //playerを取得
  getPlayer(leagueId: number, playerId: number): void {
    this.http
      .get<PlayerResponse>(`${this.mockUrl}/${leagueId}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((player) => {
        this.playerSubject.next(player);
      });
  }

  //player登録
  postPlayer(player: PlayerRequest): void {
    this.http
      .post<PlayerResponse>(`${this.mockUrl}`, player)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((player) => {
        this.playersSubject.next(this.playersSubject.getValue().concat(player));
      });
  }

  //playerName更新
  updatePlayer(updatePlayerData: PlayerResponse): void {
    this.http
      .put<PlayerResponse>(`${this.mockUrl}`, updatePlayerData)
      .pipe()
      .subscribe((player) => {
        this.playersSubject.next(
          this.playersSubject.getValue().map((players) => {
            if (players.id === player.id) {
              return player;
            } else {
              return players;
            }
          })
        );
      });
  }

  //player削除(削除はresultが残っていたらErrorを返す)
  deletePlayer(leagueId: number, playerId: number): void {
    this.http
      .delete(`${this.mockUrl}/${leagueId}/${playerId}`)
      .pipe()
      .subscribe(() => {});
  }
}
