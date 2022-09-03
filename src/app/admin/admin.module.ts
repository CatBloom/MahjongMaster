import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddLeagueDialogComponent } from './components/add-league-dialog/add-league-dialog.component';
import { AddResultComponent } from './add-result/add-result.component';
import { RulesComponent } from './components/rules/rules.component';
import { AdminMyLeagueComponent } from './admin-my-league/admin-my-league.component';
import { LeagueListComponent } from './components/league-list/league-list.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerListEditComponent } from './components/player-list-edit/player-list-edit.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddLeagueComponent,
    AddLeagueDialogComponent,
    AddResultComponent,
    RulesComponent,
    AdminMyLeagueComponent,
    LeagueListComponent,
    AddPlayerComponent,
    PlayerListComponent,
    PlayerListEditComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, OwlDateTimeModule, OwlNativeDateTimeModule, SharedModule],
})
export class AdminModule {}
