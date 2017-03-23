import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  ChartModule, SplitButtonModule, MenuModule, PanelModule, DataTableModule,
  RadioButtonModule, FieldsetModule, SliderModule, ListboxModule, SpinnerModule, InputTextModule,
  InputMaskModule, ButtonModule, EditorModule, CalendarModule, RatingModule, MultiSelectModule,
  ChipsModule, TabViewModule, DropdownModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { DataService } from './data.service';
import { ProjectsComponent } from './projects/projects.component';

import { FielderrorsComponent } from './fielderrors/fielderrors.component';


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
    InputTextModule,
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
    TabViewModule,
    RadioButtonModule,
    FieldsetModule,
    SliderModule,
    ListboxModule,
    SpinnerModule,
    DropdownModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
