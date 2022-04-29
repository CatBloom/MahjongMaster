import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rules } from '../interfaces/rules';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private readonly expressUrl = 'http://localhost:3000'; //バックエンドにアクセスするURL
  constructor(private http: HttpClient) {}

  //サーバーからルールを取得
  getRules(leagueId: string): Observable<Rules> {
    return this.http.get<Rules>(`${this.expressUrl}/${leagueId}`).pipe();
  }

  //サーバーにルールを登録
  postRules(customRules: Rules): Observable<string> {
    return this.http.post<string>(`${this.expressUrl}/rules`, customRules).pipe();
  }
}
