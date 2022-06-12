// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { AddLeagueDialogComponent } from './pages/add-league/add-league-dialog/add-league-dialog.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { RulesComponent } from './pages/shared/components/rules/rules.component';
import { RuleListComponent } from './pages/shared/components/rule-list/rule-list.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { TableComponent } from './pages/shared/components/table/table.component';
import { PieChartComponent } from './pages/shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './pages/shared/components/line-chart/line-chart.component';
import { AdminMyLeagueComponent } from './pages/admin-my-league/admin-my-league.component';
import { LeagueListComponent } from './pages/shared/components/league-list/league-list.component';
import { LeagueDetailsComponent } from './pages/league-details/league-details.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { AddPlayerComponent } from './pages/add-player/add-player.component';
import { PlayerListComponent } from './pages/shared/components/player-list/player-list.component';
import { PlayerListEditComponent } from './pages/shared/components/player-list/player-list-edit/player-list-edit.component';
import { TableResultRowComponent } from './pages/shared/components/table/table-result-row/table-result-row.component';
import { TopComponent } from './pages/top/top.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

// service
import { MockWebApiService } from './shared/api/mock-web-api.service';

// directives
import { ReplaceDirective } from './shared/directives/replace.directive';

// pipes
import { JapanesePipe } from './shared/pipes/japanese.pipe';
import { DatePipe } from '@angular/common';

// interceptor
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';

// firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    TableResultRowComponent,
    TopComponent,
    LoginComponent,
    SignupComponent,
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
    HttpClientInMemoryWebApiModule.forRoot(MockWebApiService, { dataEncapsulation: false, put204: false }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
