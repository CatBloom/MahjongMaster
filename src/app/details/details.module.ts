import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueDetailsComponent } from '../pages/league-details/league-details.component';
import { PlayerDetailsComponent } from '../pages/player-details/player-details.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from '../pages/shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../pages/shared/components/line-chart/line-chart.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlayerDetailsComponent, PieChartComponent, LineChartComponent, LeagueDetailsComponent],
  imports: [CommonModule, NgChartsModule, DetailsRoutingModule, SharedModule],
})
export class DetailsModule {}
