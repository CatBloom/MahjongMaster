import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueDetailsComponent } from '../pages/league-details/league-details.component';
import { PlayerDetailsComponent } from '../pages/player-details/player-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':league-id', component: LeagueDetailsComponent },
  { path: ':league-id/:player-id', component: PlayerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
