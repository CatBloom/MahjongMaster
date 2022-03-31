// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddResultComponent } from './add-result/add-result.component';
import { RulesComponent } from './rules/rules.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { TableComponent } from './shared/components/table/table.component';

// directives
import { ReplaceDirective } from './shared/directives/replace.directive';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
