export interface Result {
  playerName1: string;
  playerName2: string;
  playerName3: string;
  playerName4: string;
  playerPoint1: number;
  playerPoint2: number;
  playerPoint3: number;
  playerPoint4: number;
}

export interface ResultRequest extends Result {
  leagueId: number;
}

export interface ResultResponse {
  id: number;
  leagueId: number;
  createDate: Date;
  group: number;
  resultData: {
    id: number;
    leagueId: number;
    rank: number;
    playerId: number;
    playerName: string;
    point: number;
    calcPoint: number;
    group: number;
  }[];
}

export interface LeagueResultResponse {
  id: number;
  leagueId: number;
  rank: number;
  playerId: number;
  playerName: string;
  playerGameCount: number;
  playerCalcPoint: number;
  date: Date;
}

export interface PlayerResultResponse {
  id: number;
  leagueId: number;
  playerId: number;
  rank: number;
  playerName: string;
  createDate: Date;
  group: number;
  resultData: {
    id: number;
    leagueId: number;
    rank: number;
    playerId: number;
    playerName: string;
    point: number;
    calcPoint: number;
    group: number;
  }[];
}

export interface LineData {
  dateLabels: Date[];
  ranks: number[];
}

export interface PieData {
  dateLabels: string[];
  ranks: number[];
}
