import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isSpinnerSubject = new BehaviorSubject<boolean>(false);

  get isSpinner$() {
    return this.isSpinnerSubject.asObservable();
  }
  constructor() {}

  showSpinner() {
    this.isSpinnerSubject.next(true);
  }

  hideSpinner() {
    this.isSpinnerSubject.next(false);
  }
}
