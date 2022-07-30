export interface PlayerRequest {
  id?: number;
  leagueId: string;
  name: string;
}

export interface PlayerResponse extends PlayerRequest {
  id: number;
}
