import { Rules } from '../../../shared/interfaces/rules';

// 雀魂公式ルール
export const MahjongSoulRules: Rules = {
  gameType: '2',
  gameName: '4人麻雀半荘',
  playerCount: 4,
  tanyao: '1',
  back: '1',
  dora: 3,
  startPoint: 25000,
  returnPoint: 25000,
  uma1: 10,
  uma2: 5,
  uma3: -5,
  uma4: -10,
};
// 天鳳公式ルール
export const TenhouRules: Rules = {
  gameType: '2',
  gameName: '4人麻雀半荘',
  playerCount: 4,
  tanyao: '1',
  back: '1',
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
  gameType: '2',
  gameName: '4人麻雀半荘',
  playerCount: 4,
  tanyao: '1',
  back: '1',
  dora: 3,
  startPoint: 25000,
  returnPoint: 30000,
  uma1: 30,
  uma2: 10,
  uma3: -10,
  uma4: -30,
};
