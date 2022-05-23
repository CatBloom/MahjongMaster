import { Rules } from '../../../shared/interfaces/rules';

// 雀魂公式ルール
export const MahjongSoulRules: Rules = {
  radioGame: '2',
  radioDora: '2',
  radioTanyao: '1',
  radioTime: '3',
  inputStartPoint: 25000,
  inputFinishPoint: 30000,
  inputReturnPoint: 25000,
  inputCalledPoint: 0,
  inputReachPoint: 1000,
  inputDeposit: 300,
  inputPenalty1: 1000,
  inputPenalty2: 1500,
  inputPenalty3: 3000,
  inputUma1: 10,
  inputUma2: 5,
  inputUma3: -5,
  inputUma4: -10,
};
// 天鳳公式ルール
export const TenhouRules: Rules = {
  radioGame: '2',
  radioDora: '2',
  radioTanyao: '1',
  radioTime: '2',
  inputStartPoint: 25000,
  inputFinishPoint: 30000,
  inputReturnPoint: 30000,
  inputCalledPoint: 0,
  inputReachPoint: 1000,
  inputDeposit: 300,
  inputPenalty1: 1000,
  inputPenalty2: 1500,
  inputPenalty3: 3000,
  inputUma1: 20,
  inputUma2: 10,
  inputUma3: -10,
  inputUma4: -20,
};
