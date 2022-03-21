import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddResultComponent } from './add-result/add-result.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'add-league', component: AddLeagueComponent },
  { path: 'add-result/:league-id', component: AddResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
