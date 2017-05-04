import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, ConfirmDialog, MenuItem, Message, TabView, TreeNode} from "primeng/primeng";
import {SamplePeopleData} from "./sample.people.data";
import {SampleProjectsData} from "./sample.projects.data";

declare var moment: any;

declare var google: any;

declare var jQuery: any;

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
export class TimesheetComponent  {


  now = moment();

  day = this.now.format("dddd");

  dateAndMonth = this.now.format("MMMM Do, YYYY");

  @ViewChild('tabView') tabView : TabView;

  daysForTabs = [

  ]

  daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]

  projectNames = [
    "Agile Times", "Payroll App", "Point of Sale App", "Mobile App"
  ]

  taskCategory = [
    "Frontend", "Backend", "Operations", "Planning", "Requirements"
  ]


  userTimeData = [

    { day: "Monday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Frontend" },
    { day: "Tuesday", startTime: '9:00', endTime: '17:00', project: 'Payroll App', category: "Backend" },
    { day: "Wednesday", startTime: '9:00', endTime: '17:00', project: 'Point of Sale App', category: "Operations" },
    { day: "Thursday", startTime: '9:00', endTime: '17:00', project: 'Mobile App', category: "Planning" },
    { day: "Friday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Requirements" },

  ]

  displayEditDialog = false;

  // Need to import the enum to reference in the view
  PageNames = PageNames;

  dialogPageIndex : PageNames = PageNames.TimePage;

  dialogPages: MenuItem[] = [
    {label: "Time"},
    {label: "Project"},
    {label: "Place"},
    {label: "People"}
  ];

  projectsTree : TreeNode[] = SampleProjectsData.projects;

  selectedProject : TreeNode;

  mapOptions = {

    center: {lat: -33.8688, lng: 151.2093},
    zoom: 5
  };

  mapOverlays = [
    new google.maps.Marker({position: {lat: -35.3075, lng: 149.124417}, title: "Canberra Office"}),
    new google.maps.Marker({position: {lat: -33.8688, lng: 151.2093}, title: "Sydney Office"}),
    new google.maps.Marker({position: {lat: -37.813611, lng: 144.963056}, title: "Melbourne Office"}),
    new google.maps.Marker({position: {lat: -28.016667, lng: 153.4}, title: "Gold Coast Office"})
  ];

  people = SamplePeopleData.people;

  events = [
    {
      title: 'Recent Work',
      start: this.now.format(), // eg '2017-04-06 07:00:00',
      end: this.now.add(2, 'hours').format()  // eg '2017-04-06 09:00:00'
    }

  ];

  headerConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

  messages: Message[] = [];

  getTimesForDay(dayIndex) {
    //console.log(`Filtering for ${dayIndex}`);
    return this.userTimeData.filter( entry => {
      //console.log(`Comparing ${entry.day} with ${this.daysOfWeek[dayIndex]}`);
       return entry.day == this.daysOfWeek[dayIndex];
    })
  }


  constructor(private confirmationService: ConfirmationService) {
    let now = moment();
    this.daysOfWeek.forEach( day => {
        this.daysForTabs.push(now.day(day).format("ddd Do"));
    });
  }

  isSelected(tab) {
    return ( moment().format("ddd Do") == tab);
  }

  changeTabs(event) {
    //console.log(event);
    let index = event.index;
    let dayOfWeek = this.daysOfWeek[index];
    let selectedDay = moment().day(dayOfWeek);
    this.day = selectedDay.format("dddd");
    this.dateAndMonth = selectedDay.format("MMMM Do, YYYY");
  }

  goToToday() {
    // in the newer versions of PrimeNG there is an activeIndex property. I might be able to bind to it from markup?
    this.tabView.activeIndex = moment().day() - 1;
    this.messages.push({severity:'success', summary:'Switched to Today'});
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

  saveNewEntry() {
    this.displayEditDialog = false;
    this.messages.push({severity:'success', summary:'Entry Created', detail:'Your entry has been created'});
  }

  cancelDialog() {
    this.confirmationService.confirm({
      message: 'Cancel all changes. Are you sure?',
      accept: () => {
        this.displayEditDialog = false;
        this.messages.push({severity:'info', summary:'Edits Cancelled', detail:'No changes were saved'});
      },
      reject: () => {
        this.messages.push({severity:'warn', summary:'Cancelled the Cancel', detail:'Please continue your editing'});
        console.log("False cancel. Just keep editing.");
      }
    });
  }


}
