import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignup } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup = new FormGroup({
    mail: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/[\S]/), Validators.minLength(3), Validators.maxLength(10)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,32}$/i),
        Validators.minLength(6),
        Validators.maxLength(32),
      ],
    }),
    tos: new FormControl<boolean>(false, {
      nonNullable: true,
    }),
    policy: new FormControl<boolean>(false, {
      nonNullable: true,
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
  get tos() {
    return this.formGroup.get('tos') as FormControl;
  }
  get policy() {
    return this.formGroup.get('policy') as FormControl;
  }

  //passwordの表示管理用
  hide = true;
  formError = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signUp(): void {
    if (this.formGroup.invalid) {
      this.formError = true;
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
