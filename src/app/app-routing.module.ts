import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminMyLeagueComponent } from './pages/admin-my-league/admin-my-league.component';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { LeagueDetailsComponent } from './pages/league-details/league-details.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { AddResultComponent } from './pages/add-result/add-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'top', component: TopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'league', component: AdminMyLeagueComponent },
  { path: 'league/add', component: AddLeagueComponent },
  { path: 'league/:league-id', component: LeagueDetailsComponent },
  { path: 'player/edit/:league-id', component: AddPlayerComponent },
  { path: 'player/:league-id/:player-id', component: PlayerDetailsComponent },
  { path: 'result/add/:league-id', component: AddResultComponent },
  { path: 'result/update/:league-id/:result-id', component: AddResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
