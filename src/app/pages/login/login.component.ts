import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get mail() {
    return this.formGroup.get('mail') as FormControl;
  }
  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const user: UserLogin = {
      mail: this.mail.value.trim(),
      password: this.password.value.trim(),
    };
    this.authService.login(user);
  }
}
