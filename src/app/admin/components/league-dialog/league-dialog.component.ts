import { Component, Inject, OnInit } from '@angular/core';
import { LeagueRequest } from '../../../interfaces/league';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-league-dialog',
  templateUrl: './league-dialog.component.html',
  styleUrls: ['./league-dialog.component.scss'],
})
export class LeagueDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: LeagueRequest) {}

  ngOnInit(): void {}
}
