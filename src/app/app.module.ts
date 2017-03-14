import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartModule, SplitButtonModule, MenuModule, PanelModule, DataTableModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { DataService } from './data.service';
import { ProjectsComponent } from './projects/projects.component';
import {InputMaskModule, ButtonModule, EditorModule, CalendarModule} from "primeng/primeng";
import { FielderrorsComponent } from './fielderrors/fielderrors.component';
import {RatingModule} from "primeng/components/rating/rating";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {ChipsModule} from "primeng/components/chips/chips";
import {TabViewModule} from "primeng/components/tabview/tabview";


const appRoutes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "timesheets", component: TimesheetComponent},
  { path: "projects", component: ProjectsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StatisticComponent,
    TimesheetComponent,
    ProjectsComponent,
    FielderrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    EditorModule,
    InputMaskModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SplitButtonModule,
    MenuModule,
    PanelModule,
    ChartModule,
    CalendarModule,
    RatingModule,
    MultiSelectModule,
    ChipsModule,
    DataTableModule,
    TabViewModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
