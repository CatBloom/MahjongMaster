import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appReplace]',
})
export class ReplaceDirective implements OnInit, OnDestroy {
  @Input() appReplace!: FormControl | AbstractControl | null;

  private formControl!: FormControl | AbstractControl | null;
  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.formControl = this.appReplace;
    this.replaceHulfNumber();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private replaceHulfNumber() {
    if (!this.formControl) {
      return;
    }
    this.subscriptions.add(
      this.formControl.valueChanges.subscribe(() => {
        if (!this.formControl) {
          return;
        }
        const value = String(this.formControl.value);
        let newValue: string = value;

        // 全角数字を半角数字に変換
        newValue = newValue.replace(/[０-９]/g, (s) => {
          return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
        });
        // 数字以外の文字を空文字に変換
        newValue = newValue.replace(/[^\d-]/g, '');
        // 0が先頭で2桁以上の場合、0を省く
        newValue = newValue.replace(/^0([\d]{1,})/g, '$1');
        // -が先頭で2桁以上の場合、0と-を省く
        newValue = newValue.replace(/^-([-0]{1,})/g, '$1');
        if (value !== newValue) {
          this.formControl.setValue(newValue);
        }
      })
    );
  }
}
