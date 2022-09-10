import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MyLeagueComponent } from './my-league/my-league.component';
import { LeagueComponent } from './league/league.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'league', component: MyLeagueComponent, canActivate: [AuthGuard] },
      { path: 'league/add', component: LeagueComponent, canActivate: [AuthGuard] },
      { path: 'player/edit', component: PlayerComponent, canActivate: [AuthGuard] },
      { path: 'game/edit', component: GameComponent, canActivate: [AuthGuard] },
      { path: 'game/edit/:game-id', component: GameComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
