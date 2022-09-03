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
