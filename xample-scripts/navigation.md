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


Fun with TabView

    <p-tabView class="u-g-12 tabs">
        <p-tabPanel header="Monday">
          Content Monday
        </p-tabPanel>
        <p-tabPanel header="Tuesday">
          Content Tuesday
        </p-tabPanel>
        <p-tabPanel header="Wednesday">
          Content Wednesday
        </p-tabPanel>
        <p-tabPanel header="Thursday">
          Content Thursday
        </p-tabPanel>
        <p-tabPanel header="Friday">
          Content Friday
        </p-tabPanel>
      </p-tabView>
      
But in our case, we really want dynamic views!
