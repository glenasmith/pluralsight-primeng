import { Component, OnInit } from '@angular/core';

declare var moment: any;

@Component({
  selector: 'at-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  private now = moment();

  private day = this.now.format("dddd");

  private dateAndMonth = this.now.format("MMMM Do, YYYY")


  private daysForTabs = [

  ]

  private daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]

  private projectNames = [
    "Agile Times", "Payroll App", "Point of Sale App", "Mobile App"
  ]


  private userTimeData = [

    { day: "Monday", startTime: '9:00', endTime: '17:00', project: 'Monday Times' },
    { day: "Tuesday", startTime: '9:00', endTime: '17:00', project: 'TuesDay Times' },
    { day: "Wednesday", startTime: '9:00', endTime: '17:00', project: 'Wed Times' },
    { day: "Thursday", startTime: '9:00', endTime: '17:00', project: 'Thurs Times' },
    { day: "Friday", startTime: '9:00', endTime: '17:00', project: 'Fri Times' },

  ]

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
    })
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

  // onPush() {
  //   console.log("push");
  //   this.daysForTabs.push(moment().format("hh:mm:ss"));
  //   console.log(this.daysForTabs);
  // }

  ngOnInit() {
  }

}
