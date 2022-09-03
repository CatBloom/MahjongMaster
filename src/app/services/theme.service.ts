import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');

  get theme$() {
    return this.themeSubject.asObservable();
  }
  constructor(private overlay: OverlayContainer) {}

  switchTheme(bool: boolean) {
    const darkClassName = 'dark-theme';
    if (bool) {
      this.overlay.getContainerElement().classList.add(darkClassName);
      localStorage.setItem('theme', 'dark');
      this.themeSubject.next('dark');
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      localStorage.setItem('theme', 'light');
      this.themeSubject.next('light');
    }
  }
}
