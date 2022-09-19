import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AdminComponent } from './admin.component';
import { LeagueComponent } from './league/league.component';
import { LeagueDialogComponent } from './components/league-dialog/league-dialog.component';
import { GameComponent } from './game/game.component';
import { RulesFormComponent } from './components/rules-form/rules-form.component';
import { MyLeagueComponent } from './my-league/my-league.component';
import { LeagueListComponent } from './components/league-list/league-list.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerListEditComponent } from './components/player-list-edit/player-list-edit.component';
import { HelpComponent } from './help/help.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    LeagueComponent,
    LeagueDialogComponent,
    GameComponent,
    RulesFormComponent,
    MyLeagueComponent,
    LeagueListComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerListEditComponent,
    HelpComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, OwlDateTimeModule, OwlNativeDateTimeModule, SharedModule],
})
export class AdminModule {}
