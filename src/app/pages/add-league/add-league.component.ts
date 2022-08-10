import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../../shared/interfaces/rules';
import { LeagueRequest, LeagueDialog } from '../../shared/interfaces/league';
import { LeagueService } from '../../shared/services/league.service';
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
    name: new FormControl('', [Validators.required]),
    manual: new FormControl('', []),
    date: new FormControl('', []),
    displayDate: new FormControl('', []),
    rulesRadio: new FormControl('', [Validators.required]),
    rulesGroup: new FormGroup({
      gameType: new FormControl('', [Validators.required]),
      tanyao: new FormControl('', [Validators.required]),
      dora: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      startPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      returnPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      uma1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      uma2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      uma3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      uma4: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    }),
  });
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get manual() {
    return this.formGroup.get('manual') as FormControl;
  }
  get date() {
    return this.formGroup.get('date') as FormControl;
  }
  get displayDate() {
    return this.formGroup.get('displayDate') as FormControl;
  }
  get rulesRadio() {
    return this.formGroup.get('rulesRadio') as FormControl;
  }
  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get gameType() {
    return this.rulesGroup.get('gameType') as FormControl;
  }
  matcher = new MyErrorStateMatcher();
  private onDestroy$ = new Subject();

  constructor(private leagueService: LeagueService, private matDialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    // 日付整形用
    this.date.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const date: Array<Date> = this.date.value;
      const startDate = this.datePipe.transform(date[0], 'yyyy/MM/dd HH:mm');
      const finishDate = this.datePipe.transform(date[1], 'yyyy/MM/dd HH:mm');
      this.displayDate.setValue(`${startDate}~${finishDate}`);
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
        this.rulesGroup.patchValue(MLeagueRules);
        this.rulesGroup.disable();
        break;
      case 'mahjongsoulRules':
        this.rulesGroup.patchValue(MahjongSoulRules);
        this.rulesGroup.disable();
        break;
      case 'tenhouRules':
        this.rulesGroup.patchValue(TenhouRules);
        this.rulesGroup.disable();
        break;
      case 'custom':
        this.rulesGroup.enable();
        break;
    }
  }

  //formからrulesを作成する
  createRules(): Rules | null {
    let newRules: Rules = this.rulesGroup.value;
    newRules.startPoint = Number(this.rulesGroup.get('startPoint')?.value);
    newRules.returnPoint = Number(this.rulesGroup.get('returnPoint')?.value);
    newRules.uma1 = Number(this.rulesGroup.get('uma1')?.value);
    newRules.uma2 = Number(this.rulesGroup.get('uma2')?.value);
    newRules.uma3 = Number(this.rulesGroup.get('uma3')?.value);
    newRules.uma4 = Number(this.rulesGroup.get('uma4')?.value);
    switch (this.gameType.value) {
      case '1':
        newRules.gameName = '4人東風戦';
        newRules.playerCount = 4;
        return newRules;
      case '2':
        newRules = this.rulesGroup.value;
        newRules.gameName = '4人半荘戦';
        newRules.playerCount = 4;
        return newRules;
      case '3':
        newRules = this.rulesGroup.value;
        newRules.gameName = '3人東風戦';
        newRules.playerCount = 3;
        newRules.uma4 = null;
        return newRules;
      case '4':
        newRules = this.rulesGroup.value;
        newRules.gameName = '3人半荘戦';
        newRules.playerCount = 3;
        newRules.uma4 = null;
        return newRules;
      default:
        return null;
    }
  }

  postLeague() {
    const newRules = this.createRules();

    if (!newRules) {
      return;
    }

    const newleague: LeagueRequest = {
      name: this.name.value.trim(),
      manual: this.manual.value.trim(),
      startAt: !this.date.value[0] ? '' : this.date.value[0],
      finishAt: !this.date.value[1] ? '' : this.date.value[1],
      rules: newRules,
    };
    this.leagueService.postLeague(newleague);
  }

  openDialog() {
    if (this.formGroup.invalid) {
      return;
    }

    const newRules = this.createRules();

    if (!newRules) {
      return;
    }

    const leagueDialog: LeagueDialog = {
      name: this.name.value.trim(),
      manual: this.manual.value.trim(),
      startAt: this.date.value[0],
      finishAt: this.date.value[1],
      rules: newRules,
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
          this.postLeague();
        }
      });
  }
}
