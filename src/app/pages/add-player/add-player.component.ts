import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  formGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}
}
