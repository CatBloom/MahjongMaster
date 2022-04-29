import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private readonly expressUrl = 'http://localhost:3000'; //バックエンドにアクセスするURL
  constructor(private http: HttpClient) {}

  //サーバーに大会を登録
  postLeague(leagueName: string): Observable<void> {
    return this.http.post<void>(`${this.expressUrl}/league`, leagueName).pipe();
  }
}
