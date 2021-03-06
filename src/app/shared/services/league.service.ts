import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LeagueRequest, LeagueResponse } from '../interfaces/league';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/league';

  private leagueListSubject = new BehaviorSubject<LeagueResponse[]>([]);
  private leagueSubject = new BehaviorSubject<LeagueResponse>({} as LeagueResponse);

  get leagueList$() {
    return this.leagueListSubject.asObservable();
  }
  get league$() {
    return this.leagueSubject.asObservable();
  }

  constructor(private http: HttpClient, private route: Router) {}

  //大会リストを取得
  getLeagueList(uid: string): void {
    this.http
      .get<LeagueResponse[]>(`${this.apiUrl}/list/${uid}`)
      .pipe()
      .subscribe((res) => {
        this.leagueListSubject.next(res);
      });
  }

  //大会の取得
  getLeague(id: string): void {
    this.http
      .get<LeagueResponse>(`${this.apiUrl}/${id}`)
      .pipe()
      .subscribe((res) => {
        this.leagueSubject.next(res);
      });
  }

  //大会を登録
  postLeague(newleague: LeagueRequest): void {
    this.http
      .post<LeagueResponse>(`${this.apiUrl}`, newleague)
      .pipe()
      .subscribe(() => {
        this.route.navigateByUrl('league');
      });
  }

  //大会更新
  updateLeague(league: LeagueRequest): void {
    const id = league.id;
    this.http
      .put<LeagueResponse>(`${this.apiUrl}/${id}`, league)
      .pipe()
      .subscribe(() => {});
  }

  //大会削除
  deleteLeague(id: number): void {
    this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe()
      .subscribe(() => {});
  }
}
