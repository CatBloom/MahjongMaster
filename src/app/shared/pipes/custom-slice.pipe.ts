import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  //valueと表示制限する半角文字数を引数とする
  transform(value: unknown, arg: number) {
    if (typeof value !== 'string' || !value) {
      return value;
    }
    let len = 0;
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      //半角は1文字、全角は2文字でカウント
      value[i].match(/[ -~]/) ? (len += 1) : (len += 2);
      //指定の文字数で新しい文字列を作成
      if (len <= arg) {
        newValue += value[i];
      }
    }
    //制限する文字数より長い場合、"..."を付ける
    return len > arg ? newValue + '...' : value;
  }
}
