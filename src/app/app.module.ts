// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgChartsModule } from 'ng2-charts';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AddLeagueComponent } from './pages/add-league/add-league.component';
import { AddResultComponent } from './pages/add-result/add-result.component';
import { RulesComponent } from './shared/components/rules/rules.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { TableComponent } from './shared/components/table/table.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component';

// directives
import { ReplaceDirective } from './shared/directives/replace.directive';

// pipes
import { JapanesePipe } from './shared/pipes/japanese.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddLeagueComponent,
    AddResultComponent,
    RulesComponent,
    ReplaceDirective,
    PlayerDetailsComponent,
    TableComponent,
    JapanesePipe,
    PieChartComponent,
    LineChartComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
