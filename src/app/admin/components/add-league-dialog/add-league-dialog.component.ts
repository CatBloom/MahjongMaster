import { Component, Inject, OnInit } from '@angular/core';
import { LeagueRequest } from '../../../interfaces/league';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-league-dialog',
  templateUrl: './add-league-dialog.component.html',
  styleUrls: ['./add-league-dialog.component.scss'],
})
export class AddLeagueDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: LeagueRequest) {}

  ngOnInit(): void {}
}
