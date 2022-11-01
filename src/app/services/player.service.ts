import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PlayerRequest, PlayerResponse } from '../interfaces/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = environment.apiUrl;

  private playerListSubject = new BehaviorSubject<PlayerResponse[]>([]);

  get playerList$() {
    return this.playerListSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  //playerListを取得
  getPlayerList(leagueId: string): void {
    this.http
      .get<PlayerResponse[]>(`${this.apiUrl}/player/list/${leagueId}`)
      .pipe()
      .subscribe((res) => {
        this.playerListSubject.next(res);
      });
  }

  //player登録
  postPlayer(player: PlayerRequest): void {
    this.http
      .post<PlayerResponse>(`${this.apiUrl}/player`, player)
      .pipe()
      .subscribe((res) => {
        this.playerListSubject.next(this.playerListSubject.getValue().concat(res));
      });
  }

  //player更新
  updatePlayer(updatePlayerData: PlayerRequest): void {
    const id = updatePlayerData.id;
    this.http
      .put<PlayerResponse>(`${this.apiUrl}/player/${id}`, updatePlayerData)
      .pipe()
      .subscribe((res) => {
        this.playerListSubject.next(
          this.playerListSubject.getValue().map((players) => {
            if (players.id === res.id) {
              return res;
            } else {
              return players;
            }
          })
        );
      });
  }

  //ToDo player削除(削除はresultが残っていたらErrorを返す)
  deletePlayer(id: number): void {
    this.http
      .delete<PlayerResponse>(`${this.apiUrl}/player/${id}`)
      .pipe()
      .subscribe((res) => {
        const newArray = this.playerListSubject.getValue().filter((player) => {
          if (player.id !== res.id) {
            return player;
          } else {
            return null;
          }
        });
        this.playerListSubject.next(newArray);
      });
  }
}
