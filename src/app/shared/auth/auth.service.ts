import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserSignup, UserLogin } from '../interfaces/user';
import { SnackService } from '../services/snack.service';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User | null>(null);

  get user() {
    return this.userSubject$.asObservable();
  }

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private snack: SnackService,
    private spinner: SpinnerService
  ) {}

  signUp(user: UserSignup) {
    this.spinner.showSpinner();
    createUserWithEmailAndPassword(this.auth, user.mail, user.password)
      .then((result) => {
        this.addUserName(result.user, user.name);
      })
      .then(() => {
        this.login(user);
      })
      .catch(() => this.snack.openSnackBer('Error', 'x'))
      .finally(() => {
        this.spinner.hideSpinner();
      });
  }

  login(user: UserLogin) {
    this.spinner.showSpinner();
    signInWithEmailAndPassword(this.auth, user.mail, user.password)
      .then((result) => {
        this.userSubject$.next(result.user);
        this.router.navigateByUrl('/league');
      })
      .catch(() => this.snack.openSnackBer('Error', 'x'))
      .finally(() => {
        this.spinner.hideSpinner();
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.userSubject$.next(null);
        this.snack.openSnackBer('ログアウトしました', 'x');
        this.router.navigateByUrl('/top');
      })
      .catch(() => {
        this.snack.openSnackBer('Error', 'x');
      });
  }

  addUserName(user: User, userName: string) {
    updateProfile(user, { displayName: userName })
      .then(() => {})
      .catch(() => this.snack.openSnackBer('Error', 'x'));
  }

  getAuthState() {
    return new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        this.userSubject$.next(user);
        resolve(user);
        unsubscribe();
      });
    });
  }
}
