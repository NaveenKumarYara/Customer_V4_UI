import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogoHeaderComponent } from "./logoheader/logoheader.component";
import { AgmCoreModule } from "@agm/core";
import { routing } from "../app.router";
import { AlertComponent } from "./alerts/alerts.component";
import { AppService } from "../app.service";
import { AlertService } from "./alerts/alerts.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PolarChartComponent } from './polar-chart/polar-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { RadarChartLargeComponent } from './radar-chart-large/radar-chart-large.component';
import { RadarSmartChartComponent } from './radar-smart-chart/radar-smart-chart.component';
import { TooltipModule } from "ng2-tooltip-directive";

@NgModule({
  imports: [
    CommonModule,
    // routing,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule
  ],
  providers: [AppService, AlertService],
  declarations: [LogoHeaderComponent,
    AlertComponent,
    RadarChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    PolarChartComponent,
    DoughnutChartComponent,
    RadarChartLargeComponent,
    RadarSmartChartComponent
  ],
  exports: [
    LogoHeaderComponent, 
    AlertComponent,    
    RadarChartComponent,
    ChartsModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    PolarChartComponent,
    DoughnutChartComponent,
    RadarChartLargeComponent,
    RadarSmartChartComponent,
  ],
})
export class SharedModule {}
