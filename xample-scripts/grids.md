
# Grids

## Getting Setup

First, add the module:

    DataTableModule

Generate a alltimes component:

    ng g c alltimes
    
Add it to our menu (if we have introduced that yet):

    {label: 'All Timesheets', icon: 'fa-calendar', routerLink: ['/alltimes'], command: (event) => handleSelected(event)},


## Table Basics

### Skeleton Markup

Let's create some data to render:


    private allTimesheetData = [
  
      { user: 'Glen', project: 'Payroll App', category: 'Backend', startTime: 1000, endTime: 1700, date: 1434243 },
      { user: 'Karen', project: 'Agile Times', category: 'Frontend', startTime: 900, endTime: 1700, date: 1434243 },
      { user: 'Si', project: 'Mobile App', category: 'Operations', startTime: 1100, endTime: 1700, date: 1434243 },
      { user: 'Rohit', project: 'Agile Times', category: 'Backend', startTime: 800, endTime: 1700, date: 1434243 },
  
    ];


Then let's the most basic tabular markup, copying properties to friendly name:

    <p-dataTable [value]="allTimesheetData" class="ui-g-12">
      <p-column field="user" header="User"></p-column>
      <p-column field="project" header="Project"></p-column>
      <p-column field="category" header="Category"></p-column>
      <p-column field="startTime" header="Start Time"></p-column>
      <p-column field="endTime" header="End Time"></p-column>
    </p-dataTable>


### Zebra / Column Layout / Responsive
 
### Sorting

Making a column sortable, is just adding an attribute:

    <p-column field="startTime" header="Start Time" [sortable]="true" ></p-column>
    
    
You can customise the inital sort using p-dataTable tags (where 1 is ascending, and -1 is descending). Note the arrows are handled for you.:

      sortField="startTime" [sortOrder]="1"
      
Not the attribute settings here. Some are bracketed.
    
**Note:** Couldn't get multi column sort to work 
    
You can sort on multilple columns by configuring the datatable itself:

    [sortMode]="multiple"
    
And add a sortable to our category:

    <p-column field="category" header="Category" [sortable]="true"></p-column>

And you'll need to hold down the meta key (alt?) to get this going.

Challenge: And there is room to go custom on the sort routine as well by setting `sortable="custom"` implmenting an `(sortFunction)="mysort($event)` routine. Try it now!

### Filtering

Imaging we want to filter on project:

        <p-column field="project" header="Project" filter="true" filterPlaceholder="Type a Project" ></p-column> 
        
Notice if we search for "app" we get no hits, let's customise the message:

              emptyMessage="No results right now"

Now let's actually change how the filter matches.
        
You can have a filter match mode:

    filterMatchMode="contains"
    
    startsWith
    endsWith
    contains
    equals
    in

Let's implement the "contains" filter:

      <p-column field="project" header="Project" filter="true" filterPlaceholder="Type a Project" filterMatchMode="contains"></p-column>

Notice that if I sort on start time DESC, then filter on project, the filtering is maintained. With nothing for you to do!

### All-in custom filtering

Mark the datatable with a local variable:

  #dt
  
Implement the custom filter:

<template pTemplate="filter" let-col>
        <p-dropdown [options]="allProjects" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value,col.field,col.filterMatchMode)" styleClass="ui-column-filter"></p-dropdown>
      </template>
      
Construct the backing object:
      
      private allProjects = ['', 'Payroll App', 'Mobile App', 'Agile Times'];
      
Alas. Actually, a dropdown needs a ` { lable: "my label", value: 'myvalue' }` 
      
      private allProjects = ['', 'Payroll App', 'Mobile App', 'Agile Times'].map ( (proj) => { return { label: proj, value: proj }});
      
      
 

### Reorder & Resize

Need to allow users to re-order columns:

    [reorderableColumns]="true"

If they need to resize them:

    [resizableColumns]="true" columnResizeMode="fit"
    
    * fit = keep the table the same width, just resize adjacent column inverse to your changes
    * expand = expand/shrink the table width on resize

Challenge: how would you preserve width/ordering?

### Facets: Custom Headers and Footers & Global Filtering

Totals for our times? ColGroups

How about some global filtering?


    <p-dataTable [value]="cars" [rows]="10" [globalFilter]="tableSearch">

    <p-footer>
          <label for="tableSearch">Search: </label>
          <input id="tableSearch" #tableSearch type="text" placeholder="Search All The Things">
        </p-footer>
  
And maybe some styling:
 
     p-dataTable /deep/ .ui-datatable-footer input {
       margin-left: 0.5em;
       font-size: larger;
       padding: 3px;
     }
    

### Exporting

Add some markup to the footer of the table:

    <button type="button" pButton icon="fa-table" label="Export" (click)="dt.exportCSV()" style="float:right;"></button>

You can customise the filename by a setting on the datatable:
  
    exportFilename="users"
    
And a little styling:
    
    p-dataTable /deep/ .ui-datatable-footer {
      min-height: 60px;
    }


## Table Editing

### Inplace Editing (and Column Templating using the body template)

**Note:** You have to mark **both** the datatable, and the individual column as editable.

      <p-dataTable  [editable]="true" ...>
      
A common case is the incell editing of text fields.

    <p-column field="user" header="User" [editable]="true"></p-column>
    
And suddenly you're editing!

What if you want to use custom controls (date picker or drop down for example)? Again, well supported.
      
Then take advantage of the "editor" template, just as we previously took advantage of the filter template.

      <template let-col let-project="rowData" pTemplate="editor">
        <p-dropdown [(ngModel)]="project[col.field]" [options]="allProjects" [autoWidth]="false" [style]="{'width':'100%'}" required="true"></p-dropdown>
      </template>

You can now edit the project! If you don't want to use two way binding, you are welcome to use a callback `onEditComplete` or `onEditCancel`.

**Note:** that you need to add the event handler to the dataTable, not the column.

    (onEditComplete)="onEditComplete($event)
    
In the payload, you get some interesting values:

    column.field = The field name that was edited on your domain object
    column.data = the entire object used to render the row (with the updated value)
    
Let's take advantage of that info to render an alert with what's actually changed (you could use this hook to update a backend database or whatever you like).

    onEditComplete(editInfo) {
        alert(`You edited the ${editInfo.column.field} field. The new value is ${editInfo.data[editInfo.column.field]}`);
     }


### Row Selection (single)

You can have the datatable track row selection in either singles or multiples. Let's start with singles:

    selectionMode="single" [(selection)]="selectedTime"
     
     
And put in a backing property to catch the object that backs the row:

    private selectedTime : any;
   

If you need to event handle, that's on the cards too:

      (onRowSelect)="onRowSelect($event)"

You can use the data field to access the entire row that was clicked on, or just use the databound property `selectedTime`:

      onRowSelect(rowInfo) {
        console.log(JSON.stringify(rowInfo.data));
        console.log(JSON.stringify(this.selectedTime));
      }
      
### Row Selection (multiple)
      
Going multiple just means changing the markup:


    selectionMode="multiple" [(selection)]="selectedTimes" (onRowSelect)="onRowSelect($event)">


And the backing property:

    private selectedTimes : Array<any>;

And then using the Control key to multi-select.

In this case your rowInfo.data in the callback will be the latest row clicked on, and your bound `selectedTimes` property will have the full array.

Although it's cooler to go Checkbox:

    <p-column selectionMode="multiple"></p-column>
    
Kinda nice, but the massive column is a pain, let's give it some style

### Styleclass

Giving it some style, let's us share a trick for prime components:

      <p-column styleClass="selectBoxColumn" selectionMode="multiple"></p-column>

Then you get all select for free.

    p-dataTable /deep/ .selectBoxColumn {
      width: 43px;
    }

### Context Menu

First, you'll need to drag in the module:

    ContextMenuModule
    
Define a backing ContextMenu:

    private contextMenu: MenuItem[];
    
We'll use ngOnInit to setup the items we need, and a callback for when they are invoked:

      ngOnInit() {
          this.contextMenu = [
            {label: 'Debug', icon: 'fa-bug', command: (event) => this.onDebug(this.selectedTimes)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedTimes)}
          ];
        }

We'll want to implement those callbacks: (**Note:** The selectedTimes will **always** be an array of selected items, not the onRowSelect)      
      
        onDebug(selectedTimes : any) {
          console.log(JSON.stringify(selectedTimes));
        }
      
        onDelete(selectedTimes : any) {
          this.allTimesheetData = this.allTimesheetData.filter( (row) => {
            return !selectedTimes.includes(row);
          })
        }

Then create the context menu, and a matching local Variable to bind to:

    <p-contextMenu #tableContextMenu [model]="contextMenu"></p-contextMenu>
    
And finally, link the context menu to the actual data table:
    
    [contextMenu]="tableContextMenu">


### Crud Operations


## Tables at Scale

### Dynamic Columns

### Row Groups

### Virtual Scrolling

### Pagination

### Lazy Loading

