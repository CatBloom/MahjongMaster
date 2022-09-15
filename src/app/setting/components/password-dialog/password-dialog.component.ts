import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  constructor() {}
  password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,32}$/i)],
  });

  hide = true;

  ngOnInit(): void {}
}
