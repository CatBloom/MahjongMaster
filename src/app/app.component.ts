import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'title';
  isSpinner = this.spinner.isSpinner$;

  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState();
  }

  // Error Ng100の対策
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
