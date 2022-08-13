import { OnInit, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    mail: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
  });
  get mail() {
    return this.formGroup.get('mail') as UntypedFormControl;
  }
  get password() {
    return this.formGroup.get('password') as UntypedFormControl;
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
