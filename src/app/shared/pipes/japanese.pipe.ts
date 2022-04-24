import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case 'rank':
        return (value = '順位');
      case 'point':
        return (value = '点数');
      case 'calcPoint':
        return (value = '順位点');
      case 'date':
        return (value = '日付');
      case 'playerName':
        return (value = 'プレイヤー名');
      case 'totalGameCount':
        return (value = '対戦回数');
      case 'totalCalcPoint':
        return (value = '順位点合計');
      default:
        return value;
    }
  }
}
