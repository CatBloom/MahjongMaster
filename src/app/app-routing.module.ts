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
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'top', component: TopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'league', component: AdminMyLeagueComponent, canActivate: [AuthGuard] },
  { path: 'league/add', component: AddLeagueComponent, canActivate: [AuthGuard] },
  { path: 'league/:league-id', component: LeagueDetailsComponent },
  { path: 'player/edit/:league-id', component: AddPlayerComponent, canActivate: [AuthGuard] },
  { path: 'player/:league-id/:player-id', component: PlayerDetailsComponent },
  { path: 'game/add/:league-id', component: AddResultComponent, canActivate: [AuthGuard] },
  { path: 'game/update/:league-id/:game-id', component: AddResultComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
