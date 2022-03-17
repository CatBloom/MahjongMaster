import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit {
  formGroup = new FormGroup({
    playerName1: new FormControl('', [Validators.required]),
    playerName2: new FormControl('', [Validators.required]),
    playerName3: new FormControl('', [Validators.required]),
    playerName4: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}
}
