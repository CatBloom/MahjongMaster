import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';
import { UserSignup, UserLogin } from '../interfaces/user';
import { SnackService } from '../services/snack.service';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  get user$() {
    return this.userSubject.asObservable();
  }

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private snack: SnackService,
    private spinner: SpinnerService
  ) {}

  async signUp(user: UserSignup) {
    this.spinner.showSpinner();
    try {
      const result = await createUserWithEmailAndPassword(this.auth, user.mail, user.password);
      await updateProfile(result.user, { displayName: user.name });
      this.login(user);
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.catchFirebaseErrors(e);
      }
    } finally {
      this.spinner.hideSpinner();
    }
  }

  login(user: UserLogin) {
    this.spinner.showSpinner();
    signInWithEmailAndPassword(this.auth, user.mail, user.password)
      .then((result) => {
        this.userSubject.next(result.user);
        this.router.navigateByUrl('/admin/league/list');
      })
      .catch((err) => this.catchFirebaseErrors(err))
      .finally(() => {
        this.spinner.hideSpinner();
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.userSubject.next(null);
        this.snack.openSnackBer('ログアウトしました', 'x');
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.catchFirebaseErrors(err);
      });
  }

  async updateEmail(curPass: string, newMail: string) {
    const user = await this.getAuthState();
    if (user?.email) {
      try {
        const credential = EmailAuthProvider.credential(user.email, curPass);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newMail);
        this.snack.openSnackBer('メールアドレスを変更しました', 'x');
        //user情報の更新
        this.getAuthState();
        this.router.navigateByUrl('/setting');
      } catch (e) {
        if (e instanceof FirebaseError) {
          this.catchFirebaseErrors(e);
        }
      }
    } else {
      this.snack.openSnackBer('再ログインが必要です', 'x');
      this.logout();
    }
  }

  async updatePassword(curPass: string, newPass: string) {
    const user = await this.getAuthState();
    if (user?.email) {
      try {
        const credential = EmailAuthProvider.credential(user.email, curPass);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPass);
        this.snack.openSnackBer('パスワードを変更しました', 'x');
        //user情報の更新
        this.getAuthState();
        this.router.navigateByUrl('/setting');
      } catch (e) {
        if (e instanceof FirebaseError) {
          this.catchFirebaseErrors(e);
        }
      }
    } else {
      this.snack.openSnackBer('再ログインが必要です', 'x');
      this.logout();
    }
  }

  async deleteUser(curPass: string) {
    const user = await this.getAuthState();
    if (user?.email) {
      try {
        const credential = EmailAuthProvider.credential(user.email, curPass);
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        this.snack.openSnackBer('削除が完了しました', 'x');
        this.userSubject.next(null);
        this.router.navigateByUrl('/');
      } catch (e) {
        if (e instanceof FirebaseError) {
          this.catchFirebaseErrors(e);
        }
      }
    } else {
      this.snack.openSnackBer('再ログインが必要です', 'x');
      this.logout();
    }
  }

  //現在のuserを取得
  getAuthState() {
    return new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        this.userSubject.next(user);
        resolve(user);
        unsubscribe();
      });
    });
  }

  //Firebaseエラーハンドラー
  catchFirebaseErrors(e: FirebaseError) {
    switch (e.code) {
      case 'auth/wrong-password':
        this.snack.openSnackBer('パスワードが違います', 'x');
        break;
      case 'auth/email-already-in-use': {
        this.snack.openSnackBer('このメールアドレスは既に使用されています', 'x');
        break;
      }
      case 'auth/user-not-found': {
        this.snack.openSnackBer('アカウントが見つかりません', 'x');
        break;
      }
      default: {
        this.snack.openSnackBer('エラーが発生しました。しばらく時間をおいて再度お試しください', 'x');
        break;
      }
    }
  }
}
