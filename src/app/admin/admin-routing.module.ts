import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMyLeagueComponent } from '../pages/admin-my-league/admin-my-league.component';
import { AddLeagueComponent } from '../pages/add-league/add-league.component';
import { AddPlayerComponent } from '../pages/add-player/add-player.component';
import { AddResultComponent } from '../pages/add-result/add-result.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'league', pathMatch: 'full' },
  { path: 'league', component: AdminMyLeagueComponent, canActivate: [AuthGuard] },
  { path: 'league/add', component: AddLeagueComponent, canActivate: [AuthGuard] },
  { path: 'player/edit/:league-id', component: AddPlayerComponent, canActivate: [AuthGuard] },
  { path: 'game/add/:league-id', component: AddResultComponent, canActivate: [AuthGuard] },
  { path: 'game/update/:league-id/:game-id', component: AddResultComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
