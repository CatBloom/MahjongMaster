export interface Player {
  leagueId: string;
  playerName: string;
}

export interface PlayerDataset extends Player {
  playerId: string;
}
