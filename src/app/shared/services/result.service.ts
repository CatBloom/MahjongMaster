import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../interfaces/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly expressUrl = 'http://localhost:3000'; //バックエンドにアクセスするURL
  constructor(private http: HttpClient) {}

  //サーバーに対戦結果を登録
  postResult(result: Result): Observable<void> {
    return this.http.post<void>(`${this.expressUrl}/result`, result).pipe();
  }
}
