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
  doraCount = [...Array(21).keys()];

  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get gameType() {
    return this.rulesGroup.get('gameType') as FormControl;
  }

  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    // 4人麻雀と3人麻雀で必須項目を切り替える
    this.gameType.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.gameType.value === '1' || this.gameType.value === '2') {
        this.rulesGroup.get('uma4')?.setErrors({ require: true });
      } else if (this.gameType.value === '3' || this.gameType.value === '4') {
        this.rulesGroup.get('uma4')?.setErrors(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
