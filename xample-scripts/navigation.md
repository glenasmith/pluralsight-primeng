# Navigation


## Styling our Timesheet with Tabs

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



## Moving to Weekdays

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


## Dynamic Views

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


## Handling Change Events

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
