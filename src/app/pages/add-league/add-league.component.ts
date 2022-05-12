import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../../shared/interfaces/rules';
import { LeagueDialog } from '../../shared/interfaces/league';
import { LeagueService } from '../../shared/services/league.service';
import { RulesService } from '../../shared/services/rules.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLeagueDialogComponent } from '../add-league/add-league-dialog/add-league-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.scss'],
})
export class AddLeagueComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    leagueName: new FormControl('', [Validators.required]),
    leagueManual: new FormControl('', []),
    leagueDate: new FormControl('', []),
    leagueDisplayDate: new FormControl('', []),
    rulesRadio: new FormControl('', [Validators.required]),
  });

  // 取得したルール
  rules: Rules = {
    radioGame: '',
    radioDora: '',
    radioTanyao: '',
    radioTime: '',
    inputStartPoint: 0,
    inputFinishPoint: 0,
    inputReturnPoint: 0,
    inputCalledPoint: 0,
    inputReachPoint: 0,
    inputDeposit: 0,
    inputPenalty1: 0,
    inputPenalty2: 0,
    inputPenalty3: 0,
    inputUma1: 0,
    inputUma2: 0,
    inputUma3: 0,
    inputUma4: 0,
  };

  private onDestroy$ = new Subject();

  constructor(
    private leagueService: LeagueService,
    private rulesService: RulesService,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // 日付整形用
    this.formGroup
      .get('leagueDate')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        const leagueDate: Array<Date> = this.formGroup.get('leagueDate')?.value;
        const leagueStartDate = this.datePipe.transform(leagueDate[0], 'yyyy/MM/dd HH:mm');
        const leagueFinishDate = this.datePipe.transform(leagueDate[1], 'yyyy/MM/dd HH:mm');
        this.formGroup.get('leagueDisplayDate')?.setValue(`${leagueStartDate}~${leagueFinishDate}`);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  setRules(rules: Rules) {
    this.rules = rules;
  }

  openDialog() {
    if (this.formGroup.invalid) {
      return;
    }

    const newLeague: LeagueDialog = {
      leagueName: this.formGroup.get('leagueName')?.value,
      leagueManual: this.formGroup.get('leagueManual')?.value,
      leagueStartDate: this.formGroup.get('leagueDate')?.value[0],
      leagueFinishDate: this.formGroup.get('leagueDate')?.value[1],
      rules: this.rules,
    };

    //Dialogを表示
    const dialogRef = this.matDialog.open(AddLeagueDialogComponent, {
      width: '80%',
      data: newLeague,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('true');
      }
    });
  }
}
