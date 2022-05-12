import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { AdminMyLeagueComponent } from './pages/admin-my-league/admin-my-league.component';
import { LeagueDetailsComponent } from './pages/league-details/league-details.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'add-league', component: AddLeagueComponent },
  { path: 'result/add/:league-id', component: AddResultComponent },
  { path: 'result/update/:league-id/:result-id', component: AddResultComponent },
  { path: 'player/:player-id', component: PlayerDetailsComponent },
  { path: 'admin/my-league/:admin-name', component: AdminMyLeagueComponent },
  { path: 'league/:league-id', component: LeagueDetailsComponent },
  { path: 'league/add-player/:league-id', component: AddPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
