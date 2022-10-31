import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { LeagueRequest, LeagueResponse } from '../interfaces/league';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private readonly apiUrl = environment.apiUrl;

  private leagueSearchSubject = new BehaviorSubject<LeagueResponse[]>([]);
  private leagueListSubject = new BehaviorSubject<LeagueResponse[]>([]);
  private leagueSubject = new Subject<LeagueResponse>();

  get leagueSearchSubject$() {
    return this.leagueSearchSubject.asObservable();
  }
  get leagueList$() {
    return this.leagueListSubject.asObservable();
  }
  get league$() {
    return this.leagueSubject.asObservable();
  }

  //検索時はinterceptorを介さないためhttpBackendを使用
  private skipHttpClient: HttpClient = new HttpClient(this.httpBackend);

  constructor(private http: HttpClient, private route: Router, private httpBackend: HttpBackend) {}

  //大会検索用
  searchLeague(name: string) {
    if (!name || name.length < 5) {
      this.leagueSearchSubject.next([]);
      return;
    }
    const url = encodeURI(name.trim());
    this.skipHttpClient
      .get<LeagueResponse[]>(`${this.apiUrl}/league/search/${url}`)
      .pipe()
      .subscribe((res) => {
        this.leagueSearchSubject.next(res);
      });
  }

  //tokenから大会リストを取得
  getLeagueList(): void {
    this.http
      .get<LeagueResponse[]>(`${this.apiUrl}/league/list`)
      .pipe()
      .subscribe((res) => {
        this.leagueListSubject.next(res);
      });
  }

  //大会の取得
  getLeague(id: string): void {
    this.http
      .get<LeagueResponse>(`${this.apiUrl}/league/${id}`)
      .pipe()
      .subscribe((res) => {
        this.leagueSubject.next(res);
      });
  }

  //大会を登録
  postLeague(newleague: LeagueRequest): void {
    this.http
      .post<LeagueResponse>(`${this.apiUrl}/league`, newleague)
      .pipe()
      .subscribe((res) => {
        this.leagueListSubject.getValue().unshift(res);
        this.leagueListSubject.next(this.leagueListSubject.getValue());
        this.route.navigateByUrl('/admin/league/list');
      });
  }

  //大会更新
  updateLeague(league: LeagueRequest): void {
    const id = league.id;
    this.http
      .put<LeagueResponse>(`${this.apiUrl}/league/${id}`, league)
      .pipe()
      .subscribe(() => {});
  }

  //大会削除
  deleteLeague(id: string): void {
    this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe()
      .subscribe(() => {});
  }
}
