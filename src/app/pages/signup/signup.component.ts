import { OnInit, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserSignup } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    mail: new UntypedFormControl('', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get mail() {
    return this.formGroup.get('mail') as UntypedFormControl;
  }
  get name() {
    return this.formGroup.get('name') as UntypedFormControl;
  }
  get password() {
    return this.formGroup.get('password') as UntypedFormControl;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signUp(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const user: UserSignup = {
      mail: this.mail.value.trim(),
      name: this.name.value.trim(),
      password: this.password.value.trim(),
    };
    this.authService.signUp(user);
  }
}
