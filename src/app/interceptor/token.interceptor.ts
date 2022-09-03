import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { LeagueService } from '../services/league.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private leagueService: LeagueService) {}

  //requestの際にtokenをheaderに追加
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(
      this.authService.getAuthState().then((user) => {
        if (!user) {
          //userがnullならtoken無しでrequestする
          return;
        }
        return user.getIdToken();
      })
    ).pipe(
      distinctUntilChanged(),
      switchMap((token) => {
        if (token) {
          const req = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              LeagueID: this.leagueService.getLeagueIdByURL(),
            },
          });
          return next.handle(req);
        }
        return next.handle(request);
      })
    );
  }
}
