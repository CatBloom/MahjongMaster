export interface PlayerRequest {
  leagueId: number;
  playerName: string;
}

export interface PlayerResponse extends PlayerRequest {
  id: number;
  playerGameCount?: number;
  playerCalcPoint?: number;
  playerAverage?: number;
}
