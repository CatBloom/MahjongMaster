import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignup } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup = new FormGroup({
    mail: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  get mail() {
    return this.formGroup.get('mail') as FormControl;
  }
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get password() {
    return this.formGroup.get('password') as FormControl;
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
