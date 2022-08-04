import { Directive, OnInit, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appReplace]',
})
export class ReplaceDirective implements OnInit {
  constructor(private elemRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {}

  @HostListener('input') onInput(): void {
    const initValue = this.elemRef.nativeElement.value;
    let newValue: string = initValue;
    //全角数字を半角数字に変換
    newValue = newValue.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
    //数字とハイフン以外の文字を除去
    newValue = newValue.replace(/[^\d-]/g, '');
    //先頭以外の-を除去
    newValue = newValue.replace(/(?<!^)-/g, '');
    //先頭が-直後の0を除去
    newValue = newValue.replace(/^(-)0+/g, '$1');
    //先頭が0で2桁以上の数字は先頭の0を除去
    newValue = newValue.replace(/^0+(\d+)/g, '$1');

    this.elemRef.nativeElement.value = newValue;
  }

  @HostListener('blur') onBlur(): void {
    const initValue = this.elemRef.nativeElement.value;
    let newValue: string = initValue;
    //3桁以上の場合、下二桁を00に置き換える
    newValue = initValue.length >= 3 ? newValue.slice(0, initValue.length - 2) + '00' : newValue;

    this.elemRef.nativeElement.value = newValue;
  }
}
