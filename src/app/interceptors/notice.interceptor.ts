import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { SnackService } from '../services/snack.service';
import { Router } from '@angular/router';

@Injectable()
export class NoticeInterceptor implements HttpInterceptor {
  constructor(private snack: SnackService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((e) => {
        if (e instanceof HttpResponse && e.status === 200) {
          switch (request.method) {
            case 'POST':
              this.snack.openSnackBer('✅ 登録が完了しました', '✖️');
              break;
            case 'PUT':
              this.snack.openSnackBer('✅ 更新が完了しました', '✖️');
              break;
            case 'DELETE':
              this.snack.openSnackBer('✅ 削除が完了しました', '✖️');
              break;
          }
        }
      }),
      catchError((err) => {
        this.snack.openSnackBer('エラーが発生しました.', '✖️');
        this.router.navigateByUrl(`/admin/league`);
        return throwError(() => err);
      })
    );
  }
}
