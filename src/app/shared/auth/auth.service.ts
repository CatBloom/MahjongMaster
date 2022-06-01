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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User | null>(null);

  get userSubject() {
    return this.userSubject$.asObservable();
  }

  constructor(@Optional() private auth: Auth, private router: Router, private snack: SnackService) {}

  signUp(user: UserSignup) {
    createUserWithEmailAndPassword(this.auth, user.userMail, user.userPassword)
      .then((result) => {
        this.addUserName(result.user, user.userName);
        this.login(user);
      })
      .catch(() => this.snack.openSnackBer('Error', 'x'));
  }

  login(user: UserLogin) {
    signInWithEmailAndPassword(this.auth, user.userMail, user.userPassword)
      .then((result) => {
        this.userSubject$.next(result.user);
        this.router.navigateByUrl('/league');
      })
      .catch(() => this.snack.openSnackBer('Error', 'x'));
  }

  logout() {
    signOut(this.auth);
    this.userSubject$.next(null);
    this.snack.openSnackBer('ログアウトしました', 'x');
    this.router.navigateByUrl('/top');
  }

  addUserName(user: User, userName: string) {
    updateProfile(user, { displayName: userName })
      .then(() => {})
      .catch(() => this.snack.openSnackBer('Error', 'x'));
  }

  getAuthState() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        this.userSubject$.next(user);
        resolve(user);
        unsubscribe();
      });
    });
  }
}
