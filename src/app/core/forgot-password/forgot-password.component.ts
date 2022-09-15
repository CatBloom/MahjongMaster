import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/[\S]/), Validators.email],
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  sendResetEmail() {
    if (this.email.invalid) {
      return;
    }
    const email = this.email.value.trim();
    this.authService.resetPassword(email);
  }
}
