import { Rules } from './rules';

export interface LeagueRequest {
  id?: string;
  name: string;
  manual?: string;
  startAt?: string;
  finishAt?: string;
  rules: Rules;
}
export interface LeagueResponse extends LeagueRequest {
  id: string;
  uids?: {
    uid: string;
    leagueId: string;
  }[];
}
export interface LeagueDialog {
  name: string;
  manual: string;
  startAt: Date;
  finishAt: Date;
  rules: Rules;
}
