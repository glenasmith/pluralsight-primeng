# Navigation


## Tabs

### Styling our Timesheet with Tabs

First, add the module:

    TabViewModule

 I've installed moment to work with dates
 
    npm install moment --save
    
 Then update angular-cli.json
 
    "scripts": [
            "../node_modules/chart.js/dist/Chart.js",
            "../node_modules/quill/dist/quill.js",
            "../node_modules/moment/min/moment.min.js"
          ],    



### Moving to Weekdays

Imagine We have some timesheeting data for our user:

     private userTimeData = [
    
        { day: "Monday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Frontend" },
        { day: "Tuesday", startTime: '9:00', endTime: '17:00', project: 'Payroll App', category: "Backend" },
        { day: "Wednesday", startTime: '9:00', endTime: '17:00', project: 'Point of Sale App', category: "Operations" },
        { day: "Thursday", startTime: '9:00', endTime: '17:00', project: 'Mobile App', category: "Planning" },
        { day: "Friday", startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: "Requirements" },
    
      ]

Fun with TabView

    <p-tabView class="u-g-12 tabs">
    
        <p-tabPanel header="My Times">
              <p-dataTable [value]="userTimeData" class="timesheet-grid">
                   <p-column field="project" header="Project"></p-column>
                   <p-column field="category" header="Category"></p-column>
                   <p-column field="startTime" header="Start Time"></p-column>
                   <p-column field="endTime" header="End Time"></p-column>
                 </p-dataTable>
        </p-tabPanel>
        
      </p-tabView>
      
But in our case, we really want dynamic views! 

This is just as common in a biz app - you want tabs for clients, etc.


### Dynamic Views

    <p-tabView class="u-g-12 tabs" (onChange)="changeTabs($event)">
      <p-tabPanel *ngFor="let tab of daysForTabs; let i = index;" header="{{tab}}" [selected]="isSelected(tab)" >
         <p-dataTable [value]="getTimesForDay(i)" class="timesheet-grid">
           <p-column field="project" header="Project"></p-column>
           <p-column field="category" header="Category"></p-column>
           <p-column field="startTime" header="Start Time"></p-column>
           <p-column field="endTime" header="End Time"></p-column>
         </p-dataTable>
      </p-tabPanel>
  
    </p-tabView>


### Handling Change Events

You can hook into tab changes through the (onChange) handler on the tabView container.

Note: it's on the container (tabView), not the tabPanel elements

    <p-tabView class="u-g-12 tabs" (onChange)="changeTabs($event)">
    
This gives you an object with an index of the selected tab. 

If you're using dynamic tabs, you'll have some math to do. Enjoy!
    
    changeTabs(event) {
        let index = event.index;
        let dayOfWeek = this.daysOfWeek[index];
        let selectedDay = moment().day(dayOfWeek);
        this.day = selectedDay.format("dddd");
        this.dateAndMonth = selectedDay.format("MMMM Do, YYYY");
      }

## Diving Into Dialogs (Everyday Stuff)

### Creating Your First Dialog

You probably wouldn't use a dialog for this, too much user friction - just create it in place per our datatables... but it gives us an excuse to go berserk with controls.

First we'll need our magic module:


    import {DialogModule} from 'primeng/primeng';
    
Then our markup - we're going to create a modal dialog (default is non modal);

    <p-dialog header="Create Time" [(visible)]="displayEditDialog" [modal]="true" width="700" height="550">
      Our Time Entry editor goes here.
    </p-dialog>

    

And the backing code:
 
    private displayEditDialog = false;

Let's create a button to launch it...

    <button pButton label="Add Time Entry" (click)="addNewEntry()" ></button>

And let's actually display this dialog:

    addNewEntry() {
      this.displayEditDialog = true;
    }

Looking cool. I want to give it a bit more structure:

### Dialog Footers (and headers)

Like datatable, we can customise the headers and footers. Note the use of secondary class buttons for cancel. 


    <p-footer>
        <button pButton label="Cancel" icon="fa-times" (click)="displayEditDialog = false" class="ui-button-secondary"></button>
        <button pButton label="Save" icon="fa-check" (click)="saveNewEntry()" ></button>
      </p-footer>
      
There is also a matching p-header if you need it.. And style them if needed:

    p-footer button {
      float: right;
      margin: 0.5em;
    }




### Adding Steps


First we'll need our magic module:


    import {StepsModule} from 'primeng/primeng';

Let's add some markup:

    <p-steps [model]="dialogPages" [(activeIndex)]="activeIndex" [readonly]="false"></p-steps>

And some styling to fill the dialog. Since I have four steps, fill them 25% of the dialog.

    p-steps /deep/ .ui-steps-item {
      width: 25%;
    }
    
Now we'll supply the menu components to show the pages:

      private dialogPages: MenuItem[] = [
        {label: "Time"},
        {label: "Project"},
        {label: "Place"},
        {label: "People"}
      ];

And we have our steps! But now let's display some lightweight conditional markup.

TWo approaches. Use the callback from the MenuItem, or just use an ngIf, with some enums for good measure.

Add a switch to the p-dialog

    [ngSwitch]="dialogPageIndex"
    
Then use some markup to switch on an enum

     <div *ngSwitchCase="PageNames.TimePage">
         Our time page goes here.
       </div>
       <div *ngSwitchCase="PageNames.ProjectPage">
         Our project page goes here.
       </div>
       <div *ngSwitchCase="PageNames.PlacePage">
         Our place page goes here.
       </div>
       <div *ngSwitchCase="PageNames.PeoplePage">
         Our people page goes here.
       </div>
      
We do have to workaround enum scope issues... Put this above the class

    export enum PageNames {
      TimePage,
      ProjectPage,
      PlacePage,
      PeoplePage
    }

And this inside it:

    // Need to import the enum to reference in the view
      private PageNames = PageNames;
    
      private dialogPageIndex : PageNames = PageNames.TimePage;
      

Now we can navigate between divs.




### Schedule

Based on [Full Calendar](https://fullcalendar.io/) - a popular open source JS calendar.

First import the module:

    import {ScheduleModule} from 'primeng/primeng';
    
    
Add the fullcalendar dep:

    npm install fullcalendar --save
    npm install jquery --save
    npm install moment --save // if you haven't already
    
And add it to your scripts loader in .angular-cli.json:    

      "styles": [
        ...
        "../node_modules/fullcalendar/dist/fullcalendar.css"
      ],


    "scripts": [
      ...
        "../node_modules/moment/min/moment.min.js",
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/fullcalendar/dist/fullcalendar.js"
      ],

And restart.

First the markup:

      <p-schedule [events]="events" [header]="headerConfig" styleClass="calendar"
           defaultView="agendaDay" [editable]="true" [nowIndicator]="true" [allDaySlot]="false"></p-schedule>

Then the header config:

      private headerConfig = {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        };

Let's get started with a simple event:

    private events = [
    {
      title: 'Recent Work',
      start: '2017-04-06 07:00:00',
      end: '2017-04-06 08:00:00'
    }

### Trees

Import the module:

    import {TreeModule,TreeNode} from 'primeng/primeng';
    
Write some markup:

    <div *ngSwitchCase="PageNames.ProjectPage">
        <p-tree [value]="projectsTree" layout="horizontal" selectionMode="single" [(selection)]="selectedProject" ></p-tree>
      </div>
      
projectTree is a TreeNode[]. I've got some sample data in a file called `sample.projects.data.ts`:
      
      private projectsTree : TreeNode[] = SampleProjectsData.projects;
      
      private selectedProject : TreeNode;

No doubt, you're curious on the TreeNode...

      export interface TreeNode {
          label?: string;
          data?: any;
          icon?: any;
          expandedIcon?: any;
          collapsedIcon?: any;
          children?: TreeNode[];
          leaf?: boolean;
          expanded?: boolean;
          type?: string;
          parent?: TreeNode;
          partialSelected?: boolean;
          styleClass?: string;
          draggable?: boolean;
          droppable?: boolean;
          selectable?: boolean;
      }

They have a `label` and `icon` (which can be expanded or collapsed) - which are both shown on the screen. They have a `data` which you can bundle in your own data if you need it. And `children` is used to hold child nodes (with their own labels and icons)
 
 Here's an extract from our sample data file.


    {
      "label": "Projects",
      "data": "Documents Folder",
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "children": [{
        "label": "Agile Times",
        "data": "agile",
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
        "children": [
          {"label": "Frontend", "icon": "fa-chrome", "data": "fe"},
          {"label": "Backend", "icon": "fa-cloud", "data": "be"},
          {"label": "Operations", "icon": "fa-cogs", "data": "ops"}
        ]
      },

And here's the tree in operation.

Alas! We can select the root nodes.

Let's make sure only the most leaf nodes are selectable:

      "selectable": false,

If you want a more traditional tree, remove the horizontal layout!




### Adding a Map

Add the module:

  import {GMapModule} from 'primeng/primeng';
  
Add your [google api key](https://developers.google.com/maps/documentation/javascript/get-api-key), to your index.html loader:

Import the JavaScript for Google Maps API (in the HEAD of your index.html):

    <!-- GMap -->
    <script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyDMFQM5PWXsokAe7BfKSNKD_KJz5uWzyEk" ></script>

Add some markup to position the map:

    <div *ngSwitchCase="PageNames.PlacePage">
      <p-gmap [options]="mapOptions" [overlays]="mapOverlays"  styleClass="gmap"
              ></p-gmap>
    </div>
  
*Note:* You must style up a height or it won't show up:
  
      p-gmap /deep/ .gmap {
        width:100%;
        height: 320px;
      }

Provide the overlays and initial position:


    declare var google: any;

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

Catch the click on the markers:

    (onOverlayClick)="onMarkerClick($event)"
    
Implement the click:

      onMarkerClick(markerEvent) {
          console.log(markerEvent);
          console.log(`You clicked on ${markerEvent.overlay.title} at ${markerEvent.overlay.position}`);
      
          markerEvent.map.panTo(markerEvent.overlay.position);
          markerEvent.map.setZoom(12);
        }
        
You are given a handle to:
        
        markerEvent.overlay (the one clicked on) which has a title and .position()
        markerEvent.map (the Google Map object they clicked on)
        

### Adding a datagrid

Pull in the module:

    import {DataGridModule} from 'primeng/primeng';
    
Generate some [random data](https://www.mockaroo.com/).

    concat("http://i.pravatar.cc/100?u=", firstName)


Import that random data:

    
    private people = PeopleData.people;

Add the markup to paginate it (note that "rows" is individual squares visible)
    
       <p-dataGrid [value]="people" [paginator]="true" [rows]="4">
             <ng-template let-person pTemplate="item">
               <p-panel header="{{person.firstName}} {{person.lastName}}" class="ui-g-12 ui-md-3">
                 <img [src]="person.avatar"/>
               </p-panel>
             </ng-template>
           </p-dataGrid>
        
Kinda fun by the styling needs work:

    p-dataGrid /deep/ .ui-panel {
      border: 0px;
    }
    p-dataGrid /deep/ .ui-panel-titlebar {
      font-size: smaller;
      background-color: #F15B2A !important;
      text-align: center;
      height: 35px;
    }
    
    
    p-dataGrid /deep/ .ui-panel-content {
      padding: 0px;
    }
    
    p-dataGrid /deep/ .ui-panel-content img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 150px;
    }
    
Much better!

You can use lazy loading as discussed in the grids module to take things further!

### Tooltips

First import the module:

    import {TooltipModule} from 'primeng/primeng';
    
Then add the markup..

    <img [src]="person.avatar" [pTooltip]="person.email" tooltipPosition="bottom"/>
    
Position is options. 


### Confirmation Dialogs & Dialog Events

You sometimes want to catch the cancel (if form is dirty), and confirm that's what they want.

Requires both a service and a module to import:

    import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
    
    providers: [ DataService, ConfirmationService ],

Update the dialog to catch the hide: (also an (onShow) which can be helpful for intializing dialog elements)

    .
    
  
And update the button:  
  
    <button pButton label="Cancel" icon="fa-times" (click)="cancelDialog()" class="ui-button-secondary"></button>
  
Add our confirm dialog:
  
    <p-confirmDialog header="Cancel Time Creation" icon="fa fa-question-circle" width="425" [visible]="false" #confirmDialog>
        <p-footer>
          <button type="button" pButton icon="fa-close" label="No, go back" (click)="confirmDialog.reject()"></button>
          <button type="button" pButton icon="fa-check" label="Yes, lose changes" (click)="confirmDialog.accept()"></button>
        </p-footer>
    </p-confirmDialog>
  
We'll need to inject the confirmation service in backing code:

    constructor(private confirmationService: ConfirmationService) {
    
Then implement our close operation:
    

      
### Growling

First drag in the module:

    import {GrowlModule} from 'primeng/primeng';

Add some markup to our page:

      <p-growl [value]="messages"></p-growl>

ANd let's implemeting the save of new entries:

      saveNewEntry() {
          this.displayEditDialog = false;
          this.messages.push({severity:'success', summary:'Entry Created', detail:'Your entry has been created'});
        }
        
Finally, let's revisit our dialog cancel operations to get rid of those console messages, and give some real feedback:

      cancelDialog() {
        this.confirmationService.confirm({
          message: 'Cancel all changes. Are you sure?',
          accept: () => {
            this.displayEditDialog = false;
            this.messages.push({severity:'info', summary:'Edits Cancelled', detail:'No changes were saved'});
          },
          reject: () => {
            this.messages.push({severity:'warn', summary:'Cancelled the Cancel', detail:'Please continue your editing'});
          }
        });
      }

Of course, you can customise how long the growls stick around, 

    <p-growl [value]="messages" life="6000"></p-growl>
    
or whether you need auto disappear at all:
    
    <p-growl [value]="messages" [sticky]="true"></p-growl>
