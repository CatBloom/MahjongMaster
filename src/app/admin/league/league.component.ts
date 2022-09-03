import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../../interfaces/rules';
import { LeagueRequest } from '../../interfaces/league';
import { LeagueService } from '../../services/league.service';
import { MatDialog } from '@angular/material/dialog';
import { LeagueDialogComponent } from '../components/league-dialog/league-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { MahjongSoulRules, TenhouRules, MLeagueRules } from '../../utils/const-rules';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/[\S]/)],
    }),
    manual: new FormControl<string>('', { nonNullable: true }),
    date: new FormControl<string[]>([''], { nonNullable: true }),
    rulesGroup: new FormGroup({
      playerCount: new FormControl<number>(0, { validators: [Validators.required] }),
      gameType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      tanyao: new FormControl<boolean>(true, { validators: [Validators.required] }),
      back: new FormControl<boolean>(true, { validators: [Validators.required] }),
      dora: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      startPoint: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      returnPoint: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      uma1: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      uma2: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      uma3: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
      uma4: new FormControl<number>(0, { validators: [Validators.required, Validators.pattern(/^[\d-]+$/)] }),
    }),
  });

  get name() {
    return this.formGroup.get('name') as FormControl<string>;
  }
  get manual() {
    return this.formGroup.get('manual') as FormControl<string>;
  }
  get date() {
    return this.formGroup.get('date') as FormControl<string[]>;
  }
  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  // 整形データ用のformControl
  displayDate = new FormControl<string>('', { nonNullable: true });
  // ルール選択ラジオボタンのformControl
  rulesRadio = new FormControl<string>('', { nonNullable: true });
  matcher = new MyErrorStateMatcher();
  private onDestroy$ = new Subject<boolean>();

  constructor(private leagueService: LeagueService, private matDialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    // 日付整形用
    this.date.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const date: Array<string> = this.date.value;
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
    this.onDestroy$.next(true);
  }

  // 固定ルールをセットする関数
  setRules(rulesRadioValue: string) {
    this.rulesGroup.reset();
    switch (rulesRadioValue) {
      case 'mleagueRules':
        this.rulesGroup.disable();
        this.rulesGroup.patchValue(MLeagueRules);
        break;
      case 'mahjongsoulRules':
        this.rulesGroup.disable();
        this.rulesGroup.patchValue(MahjongSoulRules);
        break;
      case 'tenhouRules':
        this.rulesGroup.disable();
        this.rulesGroup.patchValue(TenhouRules);
        break;
      case 'custom':
        this.rulesGroup.enable();
        break;
    }
  }

  //formからrulesを作成する
  createRules(): Rules {
    const newRules: Rules = this.rulesGroup.value;
    newRules.playerCount = Number(this.rulesGroup.get('playerCount')?.value);
    newRules.startPoint = Number(this.rulesGroup.get('startPoint')?.value);
    newRules.returnPoint = Number(this.rulesGroup.get('returnPoint')?.value);
    newRules.uma1 = Number(this.rulesGroup.get('uma1')?.value);
    newRules.uma2 = Number(this.rulesGroup.get('uma2')?.value);
    newRules.uma3 = Number(this.rulesGroup.get('uma3')?.value);
    if (this.rulesGroup.get('playerCount')?.value === 4) {
      newRules.uma4 = Number(this.rulesGroup.get('uma4')?.value);
    } else {
      newRules.uma4 = null;
    }
    return newRules;
  }

  postLeague() {
    if (this.formGroup.invalid) {
      return;
    }

    const newleague: LeagueRequest = {
      name: this.name.value.trim(),
      manual: this.manual.value.trim(),
      startAt: !this.date.value[0] ? '' : this.date.value[0],
      finishAt: !this.date.value[1] ? '' : this.date.value[1],
      rules: this.createRules(),
    };

    //Dialogを表示
    const dialogRef = this.matDialog.open(LeagueDialogComponent, {
      width: '80%',
      data: newleague,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.leagueService.postLeague(newleague);
        }
      });
  }
}
