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
import { MahjongSoulRules, TenhouRules, MLeagueRules } from '../shared/constants/const-rules';

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
    rulesGroup: new FormGroup({
      radioGame: new FormControl('', [Validators.required]),
      radioDora: new FormControl('', [Validators.required]),
      radioTanyao: new FormControl('', [Validators.required]),
      radioTime: new FormControl('', [Validators.required]),
      inputStartPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputFinishPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputReturnPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputCalledPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputReachPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputDeposit: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputPenalty1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputPenalty2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputPenalty3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputUma1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputUma2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputUma3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      inputUma4: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    }),
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
  get rulesRadio() {
    return this.formGroup.get('rulesRadio') as FormControl;
  }
  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get radioGame() {
    return this.rulesGroup.get('radioGame') as FormControl;
  }

  // 取得したルール
  rules: Rules = this.rulesGroup.value;
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
    this.leagueDate.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const leagueDate: Array<Date> = this.leagueDate.value;
      const leagueStartDate = this.datePipe.transform(leagueDate[0], 'yyyy/MM/dd HH:mm');
      const leagueFinishDate = this.datePipe.transform(leagueDate[1], 'yyyy/MM/dd HH:mm');
      this.leagueDisplayDate.setValue(`${leagueStartDate}~${leagueFinishDate}`);
    });
    // rulesRadio変更時の処理
    this.rulesRadio.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((rulesRadioValue) => {
      this.setRules(rulesRadioValue);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  // 固定ルールをセットする関数
  setRules(rulesRadioValue: string) {
    this.rulesGroup.reset();
    switch (rulesRadioValue) {
      case 'mleagueRules':
        this.rulesGroup.setValue(MLeagueRules);
        this.rulesGroup.disable();
        break;
      case 'mahjongsoulRules':
        this.rulesGroup.setValue(MahjongSoulRules);
        this.rulesGroup.disable();
        break;
      case 'tenhouRules':
        this.rulesGroup.setValue(TenhouRules);
        this.rulesGroup.disable();
        break;
      case 'custom':
        this.rulesGroup.enable();
        break;
    }
  }

  postData() {
    this.postLeague();
    this.leagueId$.pipe(takeUntil(this.onDestroy$)).subscribe((leagueId: number) => {
      this.postRules(leagueId);
    });
  }

  postRules(leagueId: number) {
    const newRules: Rules =
      this.radioGame.value === '1' || this.radioGame.value === '2'
        ? this.rulesGroup.value
        : { ...this.rulesGroup.value, inputPenalty3: 0, inputUma4: 0 };
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

  openDialog() {
    if (this.formGroup.invalid) {
      return;
    }

    const leagueDialog: LeagueDialog = {
      leagueName: this.leagueName.value,
      leagueManual: this.leagueManual.value,
      leagueStartDate: this.leagueDate.value[0],
      leagueFinishDate: this.leagueDate.value[1],
      rules:
        this.radioGame.value === '1' || this.radioGame.value === '2'
          ? this.rulesGroup.value
          : { ...this.rulesGroup.value, inputPenalty3: 0, inputUma4: 0 },
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
