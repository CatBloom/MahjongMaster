export interface Player {
  leagueId: string;
  playerName: string;
}

export interface PlayerList extends Player {
  playerId: string;
}
