import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLeagueComponent } from './my-league/my-league.component';
import { LeagueComponent } from './league/league.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'league', pathMatch: 'full' },
  { path: 'league', component: MyLeagueComponent, canActivate: [AuthGuard] },
  { path: 'league/add', component: LeagueComponent, canActivate: [AuthGuard] },
  { path: 'player/edit/:league-id', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'game/add/:league-id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'game/update/:league-id/:game-id', component: GameComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
