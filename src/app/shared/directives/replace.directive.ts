import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appReplace]',
})
export class ReplaceDirective implements OnInit, OnDestroy {
  @Input() appReplace!: AbstractControl | null;

  private formControl!: AbstractControl | null;
  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.formControl = this.appReplace;
    this.replaceHulfNumber();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private replaceHulfNumber(): void {
    if (!this.formControl) {
      return;
    }
    this.subscriptions.add(
      this.formControl.valueChanges.subscribe(() => {
        if (!this.formControl) {
          return;
        }
        const value: string = this.formControl.value;
        let newValue: string = value;

        // 全角数字を半角数字に変換
        newValue = newValue.replace(/[０-９]/g, (s) => {
          return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
        });
        // 数字以外の文字を空文字に変換
        newValue = newValue.replace(/[^0-9]/g, '');
        // 先頭が0の場合に空にする
        newValue = newValue.replace(/^0/, '');

        if (value !== newValue) {
          this.formControl.setValue(newValue);
        }
      })
    );
  }
}
