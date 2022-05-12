export interface Result {
  playerName1: string;
  playerName2: string;
  playerName3: string;
  playerName4: string;
  playerPoint1: number;
  playerPoint2: number;
  playerPoint3: number;
  playerPoint4: number;
  calcPoint1: number;
  calcPoint2: number;
  calcPoint3: number;
  calcPoint4: number;
}

export interface PlayerResult {
  resultId: string;
  rank: number;
  leagueId: string;
  playerId: string;
  playerName: string;
  point: number;
  calcPoint: number;
  createDate: Date;
  group: number;
}
export interface PlayerResultWrapper extends PlayerResult {
  resultData: PlayerResult[];
}

export interface LeagueResult {
  rank: string;
  playerId: string;
  playerName: string;
  totalGameCount: number;
  totalCalcPoint: number;
  date: Date;
}
