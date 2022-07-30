import { Rules } from './rules';

export interface LeagueRequest {
  id?: string;
  name: string;
  manual?: string;
  startAt?: string;
  finishAt?: string;
  uid: string;
  rules: Rules;
}
export interface LeagueResponse extends LeagueRequest {
  id: string;
}
export interface LeagueDialog {
  name: string;
  manual: string;
  startAt: Date;
  finishAt: Date;
  rules: Rules;
}
