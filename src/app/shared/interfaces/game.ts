import { Rules } from './rules';

export interface GameRequest {
  id?: number;
  leagueId: string;
  results: GameResult[];
  players: GamePlayers[];
  rules: Rules;
}

export interface GamePlayers {
  id: number;
  gameId?: number;
}

export interface GameResponse {
  id: number;
  leagueId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  results: GameResultResponse[];
}

export interface GameResult {
  id?: number;
  rank: number;
  playerId: number;
  point: number;
  calcPoint?: number;
  gameId?: number;
}

export interface GameResultResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  playerId: number;
  playerName: string;
  rank: number;
  point: number;
  calcPoint: number;
  gameId: number;
}
