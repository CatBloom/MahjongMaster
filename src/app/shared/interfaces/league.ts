import { Rules } from '../interfaces/rules';

export interface LeagueRequest {
  leagueName: string;
  leagueManual?: string;
  leagueStartDate?: Date;
  leagueFinishDate?: Date;
}
export interface LeagueResponse extends LeagueRequest {
  id: number;
}
export interface LeagueDialog {
  leagueName: string;
  leagueManual: string;
  leagueStartDate: Date;
  leagueFinishDate: Date;
  rules: Rules;
}
