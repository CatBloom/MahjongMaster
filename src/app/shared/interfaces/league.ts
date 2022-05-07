import { Rules } from '../interfaces/rules';

export interface League {
  leagueName: string;
  leagueManual?: string;
}
export interface LeagueDataset extends League {
  leagueId: string;
}
export interface LeagueDialog {
  leagueName: string;
  leagueManual: string;
  rules: Rules;
}
