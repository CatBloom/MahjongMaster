import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignup } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup = new FormGroup({
    userMail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get userMail() {
    return this.formGroup.get('userMail') as FormControl;
  }
  get userName() {
    return this.formGroup.get('userName') as FormControl;
  }
  get userPassword() {
    return this.formGroup.get('userPassword') as FormControl;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signUp(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const user: UserSignup = {
      userMail: this.userMail.value,
      userName: this.userName.value,
      userPassword: this.userPassword.value,
    };
    this.authService.signUp(user);
  }
}
