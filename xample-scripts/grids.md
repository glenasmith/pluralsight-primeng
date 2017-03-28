
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
 

### Reorder & Resize

Need to allow users to re-order columns:

    [reorderableColumns]="true"

If they need to resize them:

    [resizableColumns]="true" columnResizeMode="fit"
    
    * fit = keep the table the same width, just resize adjacent column inverse to your changes
    * expand = expand/shrink the table width on resize

Challenge: how would you preserve width/ordering?


### Facets: Custom Headers and Footers & ColGroups?

Totals for our times? ColGroups

### Exporting

### Column Templating

## Table Editing

### Inplace Editing

### Row Selection

### Context Menu

### Crud Operations


## Tables at Scale

### Dynamic Columns

### Row Groups

### Virtual Scrolling

### Pagination

### Lazy Loading

