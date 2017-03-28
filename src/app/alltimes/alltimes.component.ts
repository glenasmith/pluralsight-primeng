import { Component, OnInit } from '@angular/core';

declare var moment: any;

@Component({
  selector: 'at-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css']
})
export class AlltimesComponent implements OnInit {

  private allTimesheetData = [

    { user: 'Glen', project: 'Payroll App', category: 'Backend', startTime: 1000, endTime: 1700, date: 1434243 },
    { user: 'Karen', project: 'Agile Times', category: 'Frontend', startTime: 1100, endTime: 1700, date: 1434243 },
    { user: 'Si', project: 'Mobile App', category: 'Operations', startTime: 1000, endTime: 1700, date: 1434243 },
    { user: 'Rohit', project: 'Agile Times', category: 'Backend', startTime: 800, endTime: 1700, date: 1434243 },

  ];

  //private allProjects = this.allTimesheetData.map( (ts) => { return { label: ts.project, value: ts.project }});
  private allProjects = ['', 'Payroll App', 'Mobile App', 'Agile Times'].map ( (proj) => { return { label: proj, value: proj }});

  // private selectedTime : any;

  private selectedTimes : Array<any>;

  constructor() {
  }

  ngOnInit() {
  }

  onEditComplete(editInfo) {
    alert(`You edited the ${editInfo.column.field} field. The new value is ${editInfo.data[editInfo.column.field]}`);
  }

  onRowSelect(rowInfo) {
    console.log(JSON.stringify(rowInfo.data));
    console.log(JSON.stringify(this.selectedTimes));
  }

}
