import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../../shared/interfaces/rules';
import { LeagueRequest, LeagueDialog } from '../../shared/interfaces/league';
import { LeagueService } from '../../shared/services/league.service';
import { RulesService } from '../../shared/services/rules.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLeagueDialogComponent } from '../add-league/add-league-dialog/add-league-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MyErrorStateMatcher } from 'src/app/shared/utils/error-state-matcher';

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
  get leagueName() {
    return this.formGroup.get('leagueName') as FormControl;
  }
  get leagueManual() {
    return this.formGroup.get('leagueManual') as FormControl;
  }
  get leagueDate() {
    return this.formGroup.get('leagueDate') as FormControl;
  }
  get leagueDisplayDate() {
    return this.formGroup.get('leagueDisplayDate') as FormControl;
  }
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
  leagueId$ = this.leagueService.leagueId$;
  matcher = new MyErrorStateMatcher();
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
        const leagueDate: Array<Date> = this.leagueDate.value;
        const leagueStartDate = this.datePipe.transform(leagueDate[0], 'yyyy/MM/dd HH:mm');
        const leagueFinishDate = this.datePipe.transform(leagueDate[1], 'yyyy/MM/dd HH:mm');
        this.leagueDisplayDate.setValue(`${leagueStartDate}~${leagueFinishDate}`);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  postData() {
    this.postLeague();
    this.leagueId$.pipe(takeUntil(this.onDestroy$)).subscribe((leagueId: number) => {
      this.postRules(leagueId);
    });
  }

  postRules(leagueId: number) {
    const newRules: Rules = this.rules;
    this.rulesService.postRules(newRules, leagueId);
  }

  postLeague() {
    const newleague: LeagueRequest = {
      leagueName: this.leagueName.value,
      leagueManual: this.leagueManual.value,
      leagueStartDate: this.leagueDate.value[0],
      leagueFinishDate: this.leagueDate.value[1],
    };
    this.leagueService.postLeague(newleague);
  }

  setRules(rules: Rules) {
    this.rules = rules;
  }

  openDialog() {
    if (this.formGroup.invalid) {
      return;
    }
    const leagueDialog: LeagueDialog = {
      leagueName: this.leagueName.value,
      leagueManual: this.leagueManual.value,
      leagueStartDate: this.leagueDate.value[0],
      leagueFinishDate: this.leagueDate.value[1],
      rules: this.rules,
    };
    //Dialogを表示
    const dialogRef = this.matDialog.open(AddLeagueDialogComponent, {
      width: '80%',
      data: leagueDialog,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.postData();
        }
      });
  }
}
