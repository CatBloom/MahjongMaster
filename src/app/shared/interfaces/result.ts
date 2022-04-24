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
  rank: string;
  point: number;
  calcPoint: number;
  date: Date;
  group: number;
}
export interface PlayerResultWrapper extends PlayerResult {
  resultData: PlayerResult[];
}
