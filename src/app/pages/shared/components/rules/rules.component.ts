import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit, OnDestroy {
  @Input() formGroup!: UntypedFormGroup;
  doraCount = [...Array(21).keys()];

  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as UntypedFormGroup;
  }
  get playerCount() {
    return this.rulesGroup.get('playerCount') as UntypedFormControl;
  }

  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    // 4人麻雀と3人麻雀で必須項目を切り替える
    this.playerCount.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
      this.rulesGroup.get('uma4')?.setErrors({ require: true });
      if (value === 3) {
        this.rulesGroup.get('uma4')?.setErrors(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
