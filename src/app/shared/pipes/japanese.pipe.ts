import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case 'rank':
        return (value = '順位');
      case 'results':
        return (value = '成績');
      case 'point':
        return (value = '点数');
      case 'calcPoint':
        return (value = '順位点');
      case 'date':
        return (value = '日付');
      case 'createdAt':
        return (value = '登録日');
      case 'name':
        return (value = '名前');
      case 'averageRank':
        return (value = '平均着順');
      case 'totalGame':
        return (value = '対戦数');
      case 'totalCalcPoint':
        return (value = '合計得点');

      default:
        return value;
    }
  }
}
