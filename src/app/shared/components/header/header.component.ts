import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() set toggleCheck(toggleCheck: boolean) {
    this.toggle.setValue(toggleCheck);
  }
  user$ = this.authService.user;
  toggle = new FormControl<boolean>(false, { nonNullable: true });
  onDestroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private theme: ThemeService) {}

  ngOnInit(): void {
    this.toggle.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
      this.theme.switchTheme(value);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
