import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GameResponse, GameRequest } from '../interfaces/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/game';

  private gameListSubject = new BehaviorSubject<GameResponse[]>([]);
  private gameSubject = new BehaviorSubject<GameResponse>({} as GameResponse);

  get gameList$() {
    return this.gameListSubject.asObservable();
  }
  get game$() {
    return this.gameSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  //ゲームリストを取得
  getGameList(leagueId: string): void {
    this.http
      .get<GameResponse[]>(`${this.apiUrl}/list/${leagueId}`)
      .pipe()
      .subscribe((res) => {
        this.gameListSubject.next(res);
      });
  }

  //ゲームを取得
  getGame(id: string): void {
    this.http
      .get<GameResponse>(`${this.apiUrl}/${id}`)
      .pipe()
      .subscribe((res) => {
        this.gameSubject.next(res);
      });
  }

  //ゲーム登録
  postGame(game: GameRequest): void {
    this.http
      .post<GameResponse>(`${this.apiUrl}`, game)
      .pipe()
      .subscribe(() => {});
  }

  //ゲーム更新
  updateGame(game: GameRequest): void {
    const id = game.id;
    this.http
      .put<GameResponse>(`${this.apiUrl}/${id}`, game)
      .pipe()
      .subscribe(() => {});
  }

  //ゲーム削除
  deleteGame(id: number): void {
    this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe()
      .subscribe(() => {});
  }
}
