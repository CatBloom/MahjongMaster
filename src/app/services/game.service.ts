import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameResponse, GameRequest } from '../interfaces/game';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = environment.apiUrl;

  private gameListSubject = new BehaviorSubject<GameResponse[]>([]);
  private gameSubject = new Subject<GameResponse>();

  get gameList$() {
    return this.gameListSubject.asObservable();
  }
  get game$() {
    return this.gameSubject.asObservable();
  }

  constructor(private http: HttpClient, private route: Router) {}

  //ゲームリストを取得
  getGameList(leagueId: string): void {
    this.http
      .get<GameResponse[]>(`${this.apiUrl}/game/list/${leagueId}`)
      .pipe()
      .subscribe((res) => {
        this.gameListSubject.next(res);
      });
  }

  //ゲームを取得
  getGame(id: string): void {
    this.http
      .get<GameResponse>(`${this.apiUrl}/game/${id}`)
      .pipe()
      .subscribe((res) => {
        this.gameSubject.next(res);
        this.gameListSubject.next([res]);
      });
  }

  //ゲーム登録
  postGame(game: GameRequest): void {
    this.http
      .post<GameResponse>(`${this.apiUrl}/game`, game)
      .pipe()
      .subscribe((res) => {
        this.gameListSubject.getValue().unshift(res);
        this.gameListSubject.next([...this.gameListSubject.getValue()]);
      });
  }

  //ゲーム更新
  updateGame(game: GameRequest): void {
    const id = game.id;
    this.http
      .put<GameResponse>(`${this.apiUrl}/game/${id}`, game)
      .pipe()
      .subscribe(() => {
        this.route.navigateByUrl(`/admin/game/edit`);
      });
  }

  //ゲーム削除
  deleteGame(id: number): void {
    this.http
      .delete<GameResponse>(`${this.apiUrl}/game/${id}`)
      .pipe()
      .subscribe(() => {
        this.route.navigateByUrl(`/admin/game/edit`);
      });
  }
}
