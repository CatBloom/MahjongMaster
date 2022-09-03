import { GameResponse } from './game';

export interface LeagueResultResponse {
  playerId: number;
  rank: number;
  name: string;
  totalGame: number;
  totalPoint: number;
  calcTotalPoint: number;
  averageRank: number;
  leagueId: string;
}

export interface PlayerResultResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  leagueId: string;
  totalGame: number;
  totalPoint: number;
  totalCalcPoint: number;
  averageRank: number;
  games: GameResponse[];
}

export interface PieResponse {
  rank: number;
  countRank: number;
}

export interface LineResponse {
  rank: number;
  createdAt: string;
}

export interface PieData {
  dateLabels: string[];
  ranks: number[];
}

export interface LineData {
  dateLabels: string[];
  ranks: number[];
}
