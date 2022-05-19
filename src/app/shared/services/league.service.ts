import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeagueRequest, LeagueResponse } from '../interfaces/league';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly mockUrl = 'api/league';
  private leagueSubject = new BehaviorSubject<LeagueResponse>({} as LeagueResponse);
  private leagueListSubject = new BehaviorSubject<LeagueResponse[]>([]);
  private leagueIdSubject = new Subject<number>();
  get league$() {
    return this.leagueSubject.asObservable();
  }
  get leagueList$() {
    return this.leagueListSubject.asObservable();
  }
  get leagueId$() {
    return this.leagueIdSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  //大会リストを取得
  getLeagueList(): void {
    this.http
      .get<LeagueResponse[]>(this.mockUrl)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((leagueList) => {
        this.leagueListSubject.next(leagueList);
      });
  }

  //大会の取得
  getLeague(leagueId: number): void {
    this.http
      .get<LeagueResponse>(`${this.mockUrl}/${leagueId}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((league) => {
        this.leagueSubject.next(league);
      });
  }

  //大会を登録
  postLeague(newleague: LeagueRequest): void {
    this.http
      .post<LeagueResponse>(`${this.mockUrl}`, newleague)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((league) => {
        this.leagueIdSubject.next(league.id);
      });
  }
}
