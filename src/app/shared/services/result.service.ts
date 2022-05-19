import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ResultRequest,
  ResultResponse,
  LeagueResultResponse,
  PlayerResultResponse,
  LineData,
  PieData,
} from '../interfaces/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly mockUrl = 'api/';
  private allResultSubject = new BehaviorSubject<ResultResponse[]>([]);
  private leagueResultSubject = new BehaviorSubject<LeagueResultResponse[]>([]);
  private playerResultSubject = new BehaviorSubject<PlayerResultResponse[]>([]);
  private lineDataSubject = new BehaviorSubject<LineData>({} as LineData);
  private pieDataSubject = new BehaviorSubject<PieData>({} as PieData);
  get allResult$() {
    return this.allResultSubject.asObservable();
  }
  get leagueResult$() {
    return this.leagueResultSubject.asObservable();
  }
  get playerResult$() {
    return this.playerResultSubject.asObservable();
  }
  get lineData$() {
    return this.lineDataSubject.asObservable();
  }
  get pieData$() {
    return this.pieDataSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  //大会成績を取得
  getLeagueResult(leagueId: number): void {
    const leagueResultUrl = this.mockUrl + 'leagueResult';
    this.http
      .get<LeagueResultResponse[]>(`${leagueResultUrl}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((leagueResult) => {
        this.leagueResultSubject.next(leagueResult);
      });
  }

  //すべての成績を取得
  getAllResult(leagueId: number): void {
    const resultUrl = this.mockUrl + 'result';
    this.http
      .get<ResultResponse[]>(`${resultUrl}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((result) => {
        this.allResultSubject.next(result);
      });
  }

  //player成績を取得
  getPlayerResult(leagueId: number, playerId: number): void {
    const playerResultUrl = this.mockUrl + 'playerResult';
    this.http
      .get<PlayerResultResponse[]>(`${playerResultUrl}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((playerResult) => {
        this.playerResultSubject.next(playerResult);
        this.createLineData(playerResult);
        this.createPieData(playerResult);
      });
  }

  //成績登録
  postResutl(result: ResultRequest): void {
    this.http
      .post<PlayerResultResponse>(`${this.mockUrl}`, result)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe(() => {});
  }

  //成績更新
  updateResult(updatePlayerResult: PlayerResultResponse): void {
    this.http
      .put<PlayerResultResponse>(`${this.mockUrl}`, updatePlayerResult)
      .pipe()
      .subscribe(() => {});
  }

  //result削除
  deleteResult(leagueId: number, resultId: number): void {
    this.http
      .delete(`${this.mockUrl}/${leagueId}/${resultId}`)
      .pipe()
      .subscribe(() => {});
  }

  //ChartData用の加工
  createLineData(result: PlayerResultResponse[]) {
    const lineData: LineData = {
      dateLabels: [],
      ranks: [],
    };
    if (result.length <= 10) {
      result.map((result) => {
        lineData.ranks.push(result.rank);
        lineData.dateLabels.push(result.createDate);
      });
    } else {
      for (let i = 0; i < 10; i++) {
        lineData.ranks.push(result[i].rank);
        lineData.dateLabels.push(result[i].createDate);
      }
    }
    this.lineDataSubject.next(lineData);
  }

  createPieData(result: PlayerResultResponse[]) {
    const pieRanks = this.createPieLabels(result);
    const pieLabels = this.createPieRanks(pieRanks);
    const pieData: PieData = {
      dateLabels: pieLabels,
      ranks: pieRanks,
    };
    this.pieDataSubject.next(pieData);
  }

  createPieLabels(result: PlayerResultResponse[]) {
    let _1st = 0;
    let _2nd = 0;
    let _3rd = 0;
    let _4th = 0;
    for (let i = 0; i < result.length; i++) {
      _1st = result[i].rank === 1 ? _1st + 1 : _1st;
      _2nd = result[i].rank === 2 ? _2nd + 1 : _2nd;
      _3rd = result[i].rank === 3 ? _3rd + 1 : _3rd;
      _4th = result[i].rank === 4 ? _4th + 1 : _4th;
    }
    return [_1st, _2nd, _3rd, _4th];
  }
  createPieRanks(ranks: number[]) {
    const dataLabels: string[] = [];
    for (let i = 0; i < ranks.length; i++) {
      if (ranks[i] === 0) {
        dataLabels.push('');
      } else {
        dataLabels.push(String(i + 1 + '位'));
      }
    }
    return dataLabels;
  }
}
