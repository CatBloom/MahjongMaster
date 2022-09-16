import { Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[appReplace]',
})
export class ReplaceDirective implements OnInit {
  constructor(private elemRef: ElementRef<HTMLInputElement>, private ngControl: NgControl) {}

  ngOnInit(): void {}

  @HostListener('input') onInput(): void {
    const initValue = this.elemRef.nativeElement.value;
    const maxLength = this.elemRef.nativeElement.maxLength;
    let newValue: string = initValue;
    //全角数字を半角数字に変換
    newValue = newValue.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
    //半角ハイフンに似た要素を半角ハイフンに変換
    newValue = newValue.replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-');
    //数字とハイフンとドット以外の文字を除去
    newValue = newValue.replace(/[^\d-.]/g, '');
    //先頭以外の-を除去
    if (newValue.slice(0, 1) === '-') {
      newValue = newValue.replace(/-/g, '');
      newValue = '-' + newValue;
    } else {
      newValue = newValue.replace(/-/g, '');
    }
    //Maxlengthより多く打ててしまうタイミングがあるためトリミング
    //Maxlengthが設定されていない場合-1になる
    if (maxLength !== -1 && maxLength < initValue.length) {
      newValue = newValue.substring(0, maxLength);
    }
    //nativeElementに直接挿入するとsubscriptionが反応しないためngControlを使用
    this.ngControl.control?.setValue(newValue);
  }
  @HostListener('blur') onBlur(): void {
    const initValue = this.elemRef.nativeElement.value;
    //numberに変換
    const numNewValue = Number(initValue);
    //空と数値以外は空を返す
    if (isNaN(numNewValue) || initValue === '') {
      this.ngControl.control?.setValue('');
    } else {
      this.ngControl.control?.setValue(numNewValue);
    }
  }
}
