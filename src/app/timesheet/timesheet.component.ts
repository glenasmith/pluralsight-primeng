import { Component, OnInit } from '@angular/core';

declare var moment: any;

@Component({
  selector: 'at-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  private day = moment().format("dddd");

  private dateAndMonth = moment().format("MMMM Do, YYYY")


  private daysForTabs = [

  ]

  private daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]


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
    console.log(index);
  }

  ngOnInit() {
  }

}
