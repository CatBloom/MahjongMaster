import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { AdminMyLeagueComponent } from './pages/admin-my-league/admin-my-league.component';
import { LeagueDetailsComponent } from './pages/league-details/league-details.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'add-league', component: AddLeagueComponent },
  { path: 'add-result/:league-id', component: AddResultComponent },
  { path: 'player/:player-id', component: PlayerDetailsComponent },
  { path: 'admin/my-league/:admin-name', component: AdminMyLeagueComponent },
  { path: 'league/:league-id', component: LeagueDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
