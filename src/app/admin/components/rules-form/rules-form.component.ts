import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.scss'],
})
export class RulesFormComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  doraCount = [...Array(21).keys()];

  get rulesGroup() {
    return this.formGroup.get('rulesGroup') as FormGroup;
  }
  get playerCount() {
    return this.rulesGroup.get('playerCount') as FormControl;
  }

  private onDestroy$ = new Subject<boolean>();

  constructor() {}

  ngOnInit(): void {
    // 4人麻雀と3人麻雀で必須項目を切り替える
    this.playerCount.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
      this.rulesGroup.get('uma4')?.setErrors({ require: true });
      if (value === 3) {
        this.rulesGroup.get('uma4')?.setValue('');
        this.rulesGroup.get('uma4')?.setErrors(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
