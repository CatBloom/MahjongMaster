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
import { AuthService } from 'src/app/shared/auth/auth.service';

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
      gameName: new FormControl('', [Validators.required]),
      playerCount: new FormControl('', [Validators.required]),
      dora: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      tanyao: new FormControl('', [Validators.required]),
      startPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      finishPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      returnPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      calledPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      reachPoint: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      deposit: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      penalty1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      penalty2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      penalty3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
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

  user$ = this.auth.user;
  matcher = new MyErrorStateMatcher();
  private uid = '';
  private onDestroy$ = new Subject();

  constructor(
    private leagueService: LeagueService,
    private auth: AuthService,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // ???????????????
    this.date.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const date: Array<Date> = this.date.value;
      const startDate = this.datePipe.transform(date[0], 'yyyy/MM/dd HH:mm');
      const finishDate = this.datePipe.transform(date[1], 'yyyy/MM/dd HH:mm');
      this.displayDate.setValue(`${startDate}~${finishDate}`);
    });
    // rulesRadio??????????????????
    this.rulesRadio.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((rulesRadioValue) => {
      this.setRules(rulesRadioValue);
    });

    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((user) => {
      if (!user) {
        return;
      }
      this.uid = user.uid;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  // ???????????????????????????????????????
  setRules(rulesRadioValue: string) {
    switch (rulesRadioValue) {
      case 'mleagueRules':
        this.rulesGroup.reset();
        this.rulesGroup.setValue(MLeagueRules);
        this.rulesGroup.disable();
        break;
      case 'mahjongsoulRules':
        this.rulesGroup.reset();
        this.rulesGroup.setValue(MahjongSoulRules);
        this.rulesGroup.disable();
        break;
      case 'tenhouRules':
        this.rulesGroup.reset();
        this.rulesGroup.setValue(TenhouRules);
        this.rulesGroup.disable();
        break;
      case 'custom':
        this.rulesGroup.enable();
        break;
    }
  }

  //form??????rules???????????????
  createRules(): Rules | null {
    let newRules: Rules;
    switch (this.gameType.value) {
      case '1':
        newRules = this.rulesGroup.value;
        newRules.gameName = '4????????????';
        newRules.playerCount = 4;
        return newRules;
      case '2':
        newRules = this.rulesGroup.value;
        newRules.gameName = '4????????????';
        newRules.playerCount = 4;
        return newRules;
      case '3':
        newRules = this.rulesGroup.value;
        newRules.gameName = '3????????????';
        newRules.playerCount = 3;
        newRules.penalty3 = 0;
        newRules.uma4 = 0;
        return newRules;
      case '4':
        newRules = this.rulesGroup.value;
        newRules.gameName = '3????????????';
        newRules.playerCount = 3;
        newRules.penalty3 = 0;
        newRules.uma4 = 0;
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
      uid: this.uid,
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

    //Dialog?????????
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
