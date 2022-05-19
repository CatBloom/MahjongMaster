import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rules, RulesRequest, RulesResponse } from '../interfaces/rules';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly mockUrl = 'api/rules';
  private rulesSubject = new BehaviorSubject<RulesResponse>({} as RulesResponse);
  get rules$() {
    return this.rulesSubject.asObservable();
  }

  constructor(private http: HttpClient, private route: Router) {}

  //ルールを取得
  getRules(leagueId: number): void {
    this.http
      .get<RulesResponse>(`${this.mockUrl}/${leagueId}`)
      .pipe(
        map((res) => {
          return res;
        })
      )
      .subscribe((rules) => {
        this.rulesSubject.next(rules);
      });
  }

  //ルールを登録
  postRules(newRules: Rules, leagueId: number) {
    const requestRules: RulesRequest = {
      leagueId: leagueId,
      ...newRules,
    };
    this.http
      .post<RulesRequest>(`${this.mockUrl}`, requestRules)
      .pipe()
      .subscribe(() => {
        this.route.navigateByUrl('league');
      });
  }
}
