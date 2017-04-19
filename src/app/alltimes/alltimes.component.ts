import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, MenuItem} from "primeng/primeng";
import Dexie from 'dexie';
import {Observable} from "rxjs";

@Component({
  selector: 'at-alltimes',
  templateUrl: './alltimes.component.html',
  styleUrls: ['./alltimes.component.css']
})
export class AlltimesComponent implements OnInit {

  private allTimesheetData = [

    // {user: 'Glen', project: 'Payroll App', category: 'Backend', startTime: 1000, endTime: 1700, date: 1434243},
    // {user: 'Karen', project: 'Agile Times', category: 'Frontend', startTime: 1100, endTime: 1700, date: 1434243},
    // {user: 'Si', project: 'Mobile App', category: 'Operations', startTime: 1000, endTime: 1700, date: 1434243},
    // {user: 'Rohit', project: 'Agile Times', category: 'Backend', startTime: 800, endTime: 1700, date: 1434243},

  ];

  //private allProjects = this.allTimesheetData.map( (ts) => { return { label: ts.project, value: ts.project }});
  private allProjectNames = ['', 'Payroll App', 'Mobile App', 'Agile Times'];
  private allProjects = this.allProjectNames.map((proj) => {
    return {label: proj, value: proj}
  });

  // private selectedTime : any;

  private selectedTimes: Array<any>;

  private contextMenu: MenuItem[];

  private db: Dexie;

  private recordCount: number = 5;


  constructor() {

    this.db = new Dexie('AgileTimes');

    // Define a schema
    this.db.version(1).stores({
      timesheet: 'id,user,project,category,startTime,endTime,date'
    });

    this.getRecordCount().then( (count) => { this.recordCount = count });
  }

  ngOnInit() {

    this.contextMenu = [
      {label: 'Debug', icon: 'fa-bug', command: (event) => this.onDebug(this.selectedTimes)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedTimes)}
    ];
  }

  onDebug(selectedTimes: any) {
    console.log(JSON.stringify(selectedTimes));
  }

  onDelete(selectedTimes: any) {
    this.allTimesheetData = this.allTimesheetData.filter((row) => {
      return !selectedTimes.includes(row);
    });

    let that = this;

    selectedTimes.forEach((rowToDelete) => {
      that.db.table("timesheet").delete(rowToDelete.id).then(() => {
        that.getRecordCount();
      })
    })
  }

  onEditComplete(editInfo) {
    console.log("I fired the edit: %s", JSON.stringify(editInfo));
    //alert(`You edited the ${editInfo.column.field} field. The new value is ${editInfo.data[editInfo.column.field]}`);
    this.db.table("timesheet").update(editInfo.data["id"], editInfo.data);
  }

  onRowSelect(rowInfo) {
    //console.log(JSON.stringify(rowInfo.data));
    //console.log(JSON.stringify(this.selectedTimes));
  }


  generateRandomUser(id: number) {

    var names = ["Joe", "Mary", "Phil", "Karen", "Si", "Tim", "Rohit", "Jenny", "Kim", "Greg", "Danni"]
    var allProjectNames = ['Payroll App', 'Mobile App', 'Agile Times'];
    var allCategories = ['Frontend', 'Backend', 'Operations'];

    let newUser = {
      id: id,
      user: names[id % names.length],
      project: allProjectNames[id % allProjectNames.length],
      category: allCategories[id % allCategories.length],
      startTime: Math.round(Math.random() * 1000),
      endTime: Math.round(Math.random() * 1000),
      date: Math.round(Math.random() * 100000)
    };
    newUser.endTime += newUser.startTime; // to make sure it's later

    return newUser;

  }

  getRecordCount(): Dexie.Promise<number> {
    return this.db.table("timesheet").count();
  }

  resetDatabase() {

    let that = this;

    this.db.table("timesheet").clear().then(() => {
      console.log("Database Cleared");
      Observable.range(0, 1000).do(
        function (id) {
          let randomUser = that.generateRandomUser(id);
          that.db.table("timesheet").add(randomUser);
          if (id % 10 == 0) {
            that.getRecordCount().then((count) => {
              that.recordCount = count;
            })
          }

        },
        function (err) {
          console.log("Do Error: %s", err);
        },
        function () {
          console.log("Do complete");
        }).subscribe(() => {
        console.log("Finished Reset database");
        that.getRecordCount().then((count) => {
          that.recordCount = count;
        })
      });
    })
  }

  loadTimes(event: LazyLoadEvent) {

    console.log(JSON.stringify(event));

    let table = this.db.table("timesheet");

    var query : any;

    // Dexie doesn't support ordering AND filtering, so we branch here
    // Alternative strategies here: https://github.com/dfahlander/Dexie.js/issues/297
    if (event.filters && event.filters["project"]) {
      query = table.where("project").equals(event.filters["project"]["value"]);
    } else if (event.globalFilter) {
      query = table.where("project").startsWithIgnoreCase(event.globalFilter)
                      .or("user").startsWithIgnoreCase(event.globalFilter)
                      .or("category").startsWithIgnoreCase(event.globalFilter);
    } else {
      query = table.orderBy(event.sortField);
    }

    query = query
              .offset(event.first)
              .limit(event.rows);

    if (event.sortOrder == -1) {
      query = query.reverse();
    };

    query.toArray( (nextBlockOfTimes) => {
      // console.log("Loaded times: %s", JSON.stringify(nextBlockOfTimes));
      this.allTimesheetData = nextBlockOfTimes;
    });
  }


}
