import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SpinnerService } from './services/spinner.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'title';
  isSpinner = this.spinner.isSpinner$;
  theme$ = this.theme.theme$;

  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
    private theme: ThemeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState();
    if (localStorage.getItem('theme') === 'dark') {
      this.theme.switchTheme(true);
    } else {
      this.theme.switchTheme(false);
    }
  }

  // Error Ng100の対策
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
