import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;

  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get gameType() {
    return this.rulesGroup.get('gameType') as FormControl;
  }
  get uma1() {
    return this.rulesGroup.get('uma1') as FormControl;
  }
  get uma2() {
    return this.rulesGroup.get('uma2') as FormControl;
  }
  get uma3() {
    return this.rulesGroup.get('uma3') as FormControl;
  }
  get uma4() {
    return this.rulesGroup.get('uma4') as FormControl;
  }

  // 詳細ルール表示用のフォームコントロール
  isAdvanced = new FormControl(false);
  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    // 4人麻雀と3人麻雀で必須項目を切り替える
    this.gameType.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.gameType.value === '1' || this.gameType.value === '2') {
        this.uma4.setErrors({ require: true });
      } else if (this.gameType.value === '3' || this.gameType.value === '4') {
        this.uma4.setErrors(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
