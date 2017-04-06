import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem, Message, TabView, TreeNode} from "primeng/primeng";
import {SamplePeopleData} from "./sample.people.data";
import {SampleProjectsData} from "./sample.projects.data";

declare var moment: any;

declare var google: any;

declare var jquery: any;

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
export class TimesheetComponent implements OnInit, AfterViewInit {


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

  private projectsTree : TreeNode[] = SampleProjectsData.projects;

  private selectedProject : TreeNode;

  private mapOptions: any;

  private mapOverlays: any[];

  private people = SamplePeopleData.people;

  private events = [
    {
      title: 'Recent Work',
      start: '2017-04-06 07:00:00',
      end: '2017-04-06 08:00:00'
    }

  ];

  private headerConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

  getTimesForDay(dayIndex) {
    //console.log(`Filtering for ${dayIndex}`);
    return this.userTimeData.filter( entry => {
      //console.log(`Comparing ${entry.day} with ${this.daysOfWeek[dayIndex]}`);
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

    this.mapOptions = {

      center: {lat: -33.8688, lng: 151.2093},
      zoom: 5
    };

    // http://www.mapcoordinates.net/en
    this.mapOverlays = [
      new google.maps.Marker({position: {lat: -35.3075, lng: 149.124417}, title: "Canberra Office"}),
      new google.maps.Marker({position: {lat: -33.8688, lng: 151.2093}, title: "Sydney Office"}),
      new google.maps.Marker({position: {lat: -37.813611, lng: 144.963056}, title: "Melbourne Office"}),
      new google.maps.Marker({position: {lat: -28.016667, lng: 153.4}, title: "Gold Coast Office"})
    ];

  }

  ngAfterViewInit(): void {

  }


  onMarkerClick(markerEvent) {
    console.log(markerEvent);
    console.log(`You clicked on ${markerEvent.overlay.title} at ${markerEvent.overlay.position}`);

    markerEvent.map.panTo(markerEvent.overlay.position);
    markerEvent.map.setZoom(12);
  }

  addNewEntry() {
    this.displayEditDialog = true;
  }



}
