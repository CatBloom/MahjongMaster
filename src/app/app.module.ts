// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { AddLeagueDialogComponent } from './pages/add-league/add-league-dialog/add-league-dialog.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { RulesComponent } from './pages/shared/components/rules/rules.component';
import { RuleListComponent } from './pages/shared/components/rule-list/rule-list.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { TableComponent } from './shared/components/table/table.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component';
import { AdminMyLeagueComponent } from './pages/admin-my-league/admin-my-league.component';
import { LeagueListComponent } from './pages/shared/components/league-list/league-list.component';
import { LeagueDetailsComponent } from './pages/league-details/league-details.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { PlayerListComponent } from './pages/shared/components/player-list/player-list.component';
import { PlayerListEditComponent } from './pages/shared/components/player-list/player-list-edit/player-list-edit.component';

// directives
import { ReplaceDirective } from './shared/directives/replace.directive';

// pipes
import { JapanesePipe } from './shared/pipes/japanese.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddLeagueComponent,
    AddLeagueDialogComponent,
    AddResultComponent,
    RulesComponent,
    RuleListComponent,
    ReplaceDirective,
    PlayerDetailsComponent,
    TableComponent,
    JapanesePipe,
    PieChartComponent,
    LineChartComponent,
    AdminMyLeagueComponent,
    LeagueListComponent,
    LeagueDetailsComponent,
    ButtonComponent,
    AddPlayerComponent,
    PlayerListComponent,
    PlayerListEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgChartsModule,
    FontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
