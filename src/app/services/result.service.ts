import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {
  LeagueResultResponse,
  LineData,
  PieData,
  PlayerResultResponse,
  PieResponse,
  LineResponse,
} from '../interfaces/result';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly apiUrl = environment.apiUrl;

  private leagueResultSubject = new BehaviorSubject<LeagueResultResponse[]>([]);
  private playerResultSubject = new BehaviorSubject<PlayerResultResponse>({} as PlayerResultResponse);
  private lineDataSubject = new BehaviorSubject<LineData>({} as LineData);
  private pieDataSubject = new BehaviorSubject<PieData>({} as PieData);

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

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  //大会成績を取得
  getLeagueResult(leagueId: string): void {
    this.http
      .get<LeagueResultResponse[]>(`${this.apiUrl}/result/league/${leagueId}`)
      .pipe()
      .subscribe((res) => {
        this.leagueResultSubject.next(res);
      });
  }

  //player成績を取得
  getPlayerResult(playerId: number): void {
    this.http
      .get<PlayerResultResponse>(`${this.apiUrl}/result/player/${playerId}`)
      .pipe()
      .subscribe((res) => {
        this.playerResultSubject.next(res);
      });
  }

  //pie-chart用
  getPieData(playerId: number) {
    this.http
      .get<PieResponse[]>(`${this.apiUrl}/result/player/pie/${playerId}`)
      .pipe()
      .subscribe((res) => {
        this.createPieData(res);
      });
  }

  //line-chart用
  getLineData(playerId: number) {
    this.http
      .get<LineResponse[]>(`${this.apiUrl}/result/player/line/${playerId}`)
      .pipe()
      .subscribe((res) => {
        this.createLineData(res);
      });
  }

  //ChartData用の加工
  createLineData(result: LineResponse[]) {
    const lineData: LineData = {
      dateLabels: [],
      ranks: [],
    };

    result.map((result) => {
      lineData.ranks.push(result.rank);
      lineData.dateLabels.push(String(this.datePipe.transform(result.createdAt, 'yyyy/MM/dd HH:mm')));
    });

    this.lineDataSubject.next(lineData);
  }

  createPieData(result: PieResponse[]) {
    const pieRanks = this.createPieLabels(result);
    const pieLabels = this.createPieRanks(pieRanks);
    const pieData: PieData = {
      dateLabels: pieLabels,
      ranks: pieRanks,
    };
    this.pieDataSubject.next(pieData);
  }

  createPieLabels(result: PieResponse[]) {
    const arr: number[] = [0, 0, 0, 0];
    result.map((v) => {
      arr[v.rank - 1] = v.countRank;
    });
    return arr;
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
