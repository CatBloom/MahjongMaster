import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case 'rank':
        return (value = '順位');
      case 'result':
        return (value = '成績');
      case 'point':
        return (value = '点数');
      case 'calcPoint':
        return (value = '順位点');
      case 'date':
        return (value = '日付');
      case 'createDate':
        return (value = '登録日');
      case 'playerName':
        return (value = '名前');
      case 'playerGameCount':
        return (value = '対戦数');
      case 'playerCalcPoint':
        return (value = '合計点');

      default:
        return value;
    }
  }
}
