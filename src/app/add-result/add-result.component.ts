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
    playerPoint1: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint2: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint3: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    playerPoint4: new FormControl('', [Validators.required, Validators.pattern('^[-.0-9]+$')]),
    calcPoint1: new FormControl('', []),
    calcPoint2: new FormControl('', []),
    calcPoint3: new FormControl('', []),
    calcPoint4: new FormControl('', []),
  });
  constructor() {}

  ngOnInit(): void {}
}
