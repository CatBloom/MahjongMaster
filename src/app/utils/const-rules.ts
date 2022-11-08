import { Rules } from '../interfaces/rules';

// 雀魂公式ルール
export const MahjongSoulRules: Rules = {
  playerCount: 4,
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: 3,
  startPoint: 25000,
  returnPoint: 25000,
  uma1: 15,
  uma2: 5,
  uma3: -5,
  uma4: -15,
};
// 天鳳公式ルール
export const TenhouRules: Rules = {
  playerCount: 4,
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: 3,
  startPoint: 25000,
  returnPoint: 30000,
  uma1: 20,
  uma2: 10,
  uma3: -10,
  uma4: -20,
};
// Mリーグ公式ルール
export const MLeagueRules: Rules = {
  playerCount: 4,
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: 3,
  startPoint: 25000,
  returnPoint: 30000,
  uma1: 30,
  uma2: 10,
  uma3: -10,
  uma4: -30,
};
