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
    userMail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required]),
  });
  get userMail() {
    return this.formGroup.get('userMail') as FormControl;
  }
  get userPassword() {
    return this.formGroup.get('userPassword') as FormControl;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const user: UserLogin = {
      userMail: this.userMail.value,
      userPassword: this.userPassword.value,
    };
    this.authService.login(user);
  }
}
