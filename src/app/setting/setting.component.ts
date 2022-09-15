import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';

const validatePasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass = control.get('newPassword')?.value;
  const confirmPass = control.get('confirmPassword')?.value;
  return confirmPass === '' ? null : pass === confirmPass ? null : { unmatch: true };
};

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
  //メール変更のフォーム
  newMail = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/[\S]/), Validators.email],
  });
  //パスワード変更のフォーム
  passwordForm = new FormGroup(
    {
      newPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,32}$/i)],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    validatePasswords
  );

  get newPassword() {
    return this.passwordForm.get('newPassword') as FormControl;
  }
  mailError = false;
  passwordError = false;
  hide = true;
  private onDestroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  //FirebaseAuthのmail変更
  updateMail() {
    if (this.newMail.invalid) {
      this.mailError = true;
      return;
    }
    const newMailValue = this.newMail.value.trim();
    const dialogRef = this.matDialog.open(PasswordDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.authService.updateEmail(result, newMailValue);
          this.newMail.reset();
        }
      });
  }

  //FirebaseAuthのpassword変更
  updatePassword() {
    if (this.newPassword.invalid) {
      this.passwordError = true;
      return;
    }
    const newPasswordValue = this.newPassword.value?.trim();
    const dialogRef = this.matDialog.open(PasswordDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.authService.updatePassword(result, newPasswordValue);
          this.passwordForm.reset();
        }
      });
  }

  //FirebaseAuthのuser削除
  deleteUser() {
    const dialogRef = this.matDialog.open(PasswordDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.authService.deleteUser(result);
        }
      });
  }
}
