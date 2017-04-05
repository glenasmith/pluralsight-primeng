import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem, Message, TabView} from "primeng/primeng";

declare var moment: any;

export enum PageNames {
  TimePage,
  ProjectPage,
  PlacePage,
  PeoplePage
}

@Component({
  selector: 'at-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  private now = moment();

  private day = this.now.format("dddd");

  private dateAndMonth = this.now.format("MMMM Do, YYYY");

  @ViewChild('tabView') tabView : TabView;

  private daysForTabs = [

  ]

  private daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]

  private projectNames = [
    "Agile Times", "Payroll App", "Point of Sale App", "Mobile App"
  ]

  private taskCategory = [
    "Frontend", "Backend", "Operations", "Planning", "Requirements"
  ]


  private userTimeData = [

    { day: "Monday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Frontend" },
    { day: "Tuesday", startTime: '9:00', endTime: '17:00', project: 'Payroll App', category: "Backend" },
    { day: "Wednesday", startTime: '9:00', endTime: '17:00', project: 'Point of Sale App', category: "Operations" },
    { day: "Thursday", startTime: '9:00', endTime: '17:00', project: 'Mobile App', category: "Planning" },
    { day: "Friday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Requirements" },

  ]

  private displayEditDialog = false;

  //private dialogPageIndex = 0;

  // Need to import the enum to reference in the view
  private PageNames = PageNames;

  private dialogPageIndex : PageNames = PageNames.TimePage;

  private dialogPages: MenuItem[] = [
    {label: "Time"},
    {label: "Project"},
    {label: "Place"},
    {label: "People"}
  ];

  getTimesForDay(dayIndex) {
    console.log(`Filtering for ${dayIndex}`);
    return this.userTimeData.filter( entry => {
      console.log(`Comparing ${entry.day} with ${this.daysOfWeek[dayIndex]}`);
       return entry.day == this.daysOfWeek[dayIndex];
    })
  }


  constructor() {
    let now = moment();
    this.daysOfWeek.forEach( day => {
        this.daysForTabs.push(now.day(day).format("ddd Do"));
    });
  }

  isSelected(tab) {
    return ( moment().format("ddd Do") == tab);
  }

  changeTabs(event) {
    console.log(event);
    let index = event.index;
    let dayOfWeek = this.daysOfWeek[index];
    let selectedDay = moment().day(dayOfWeek);
    this.day = selectedDay.format("dddd");
    this.dateAndMonth = selectedDay.format("MMMM Do, YYYY");
  }

  goToToday() {
    // in the newer versions of PrimeNG there is an activeIndex property. I might be able to bind to it from markup?
    //this.tabView.activeIndex = moment().day();
  }

  ngOnInit() {
  }

  addNewEntry() {
    this.displayEditDialog = true;
  }



}
