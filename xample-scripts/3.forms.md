
# Forms

Reactive is the way to go. Much more configurable than Template Driven.

Import the ReactiveFormsModule before you start!
 
     imports: [
       BrowserModule,
       FormsModule,
       ReactiveFormsModule,
       

## Create a basic reactive form

Note to get theme and validation styling, we need to add a `pInputText` directive.

       <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="ui-g">
       
         <p-panel header="New Project" class="ui-g-12">
       
           <div class="ui-g">
       
             <label for="projectId" class="ui-g-12 ui-md-2">Project Id</label>
             <input pInputText id="projectId" formControlName="projectId" placeholder="Enter Your Project Id" class="ui-g-12 ui-md-5"/>
             <div class="ui-g-12 ui-md-5">
       
               <!-- for our error messages -->
       
             </div>
       
       
       
           </div>
       
       
           <button [disabled]="hasFormErrors()" label="Save"></button>
       
         </p-panel>


       
## With some backing helpers

So our validate trips nicely.
       
    private projectForm : FormGroup;
  
    constructor(private fb : FormBuilder) { }
  
    ngOnInit() {
      this.projectForm = this.fb.group({
        projectId: ['', [Validators.required, Validators.minLength(5)]]
      })
    }
  
    hasFormErrors() {
      return !this.projectForm.valid;
    }
  
    fieldErrors(field : string) {
      let controlState = this.projectForm.controls[field];
      return  (controlState.errors && controlState.dirty) ? controlState.errors : null;
    }
       
       
## Using Validation Styles

       
       
       <div class="ui-message ui-messages-error ui-corner-all"
                           *ngIf="fieldErrors('projectId')">
                        <i class="fa fa-close"></i>
                        <span *ngIf="fieldErrors('projectId').required">Project ID is required</span>
                        <span *ngIf="fieldErrors('projectId').minlength">Project ID must be 5 characters</span>
                      </div>
       

## Applying Platform Styling

Notice the button is not styled quite right? pButton fixes that. And gives us icon support too:

    imports: [
       BrowserModule,
        ButtonModule,
       
    <button [disabled]="hasFormErrors()" pButton icon="fa-floppy-o" label="Save"></button>       
       
       
## Masked Forms

First import the module

    imports: [
           BrowserModule,
           FormsModule,
           ReactiveFormsModule,
           InputMaskModule,


Specify masks as:

    a - Alpha character (A-Z,a-z)
    9 - Numeric character (0-9)
    * - Alpha numberic character (A-Z,a-z,0-9)
    
We'll keep the same layout:

    <p-inputMask mask="aaa-999" id="projectId" formControlName="projectId" placeholder="ABC-123" class="ui-g-12 ui-md-5"></p-inputMask>
    
You'll notice some glitches in the current mask save. But they still prevent clicking on save once the cycle finishes.

## Added in a basic description with TextArea

First import the module

    imports: [
           BrowserModule,
           InputTextareaModule,


    <label for="description" class="ui-g-12">Description</label>
      <textarea id="description" rows="10" pInputTextarea formControlName="description"  class="ui-g-12"></textarea>
      <div class="ui-g-12">
        <at-fielderrors [form]="projectForm" field="description" nicename="Description"> </at-fielderrors>
      </div>


## Then back fill with a rich text editor


    npm install quill --save
    
Update your CLI with the scripts & styles you need:
    

          "styles": [
            "styles.css",
            "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css",
            "../node_modules/font-awesome/css/font-awesome.css",
            "../node_modules/primeng/resources/primeng.css",
            "../node_modules/primeng/resources/themes/bootstrap/theme.css",
            "../node_modules/quill/dist/quill.core.css",
            "../node_modules/quill/dist/quill.snow.css"
          ],
          "scripts": [
            "../node_modules/chart.js/dist/Chart.js",
            "../node_modules/quill/dist/quill.js"
          ],

Added the editor module to your module loader:

    EditorModule
    
Then you're good to go:

    <p-editor id="description" formControlName="description"  class="ui-g-12" [style]="{'height':'200px'}"></p-editor>
    
Don't forget to style the size.

## Adding a Calendar

First, add the module:

    CalendarModule

Then add the backing property:

    startDate: [new Date(), Validators.required],

Then the markup: Date format is US by default so set you prefs with the dateFormat attribute

    <label for="startDate" class="ui-g-12 ui-md-2">Start Date</label>
    <p-calendar [showIcon]="true" id="startDate" formControlName="startDate" dateFormat="dd/mm/yy" class="ui-g-12 ui-md-5"></p-calendar>
    <div class="ui-g-12 ui-md-5">
    
            <at-fielderrors [form]="projectForm" field="startDate" nicename="Start Date"> </at-fielderrors>
    
    </div>
    
Reader Exercise: Set a [minDate] property to make sure it's greater than this current year.

    [minDate]="minProjectDate"
    
    private minProjectDate = new Date();

    
## Calendar Options to Explore

Staggering array of customisation is supported - min and max dates, steps between days, multimonth display, time selection, formatting, the list goes on. See docs.

Basic Support for i18n through supplying locale arrays for your own day, month names,etc. 
    
Reader Exercise: Hook into the Calendar select by implementing an `(onSelect)` and display an alert of the date.
      
      
## Implementing Radios

First, add the module:
      
    RadioButtonModule
    
Then code up some buttons

        <p-radioButton name="projGroup" label="Front End" value="F" formControlName="projectType"></p-radioButton>
        <p-radioButton name="projGroup" label="Backend End" value="B" formControlName="projectType"></p-radioButton>
        <p-radioButton name="projGroup" label="Operations" value="O" formControlName="projectType"></p-radioButton>

And bind to a backing property with a default value:

  projectType: ['B'],
  
And some styling please:

  p-radioButton {
    display:block;
    margin: .7em;
  }

Exercise: Refactor with an *ngFor to use a backing property.

## Wrap it in a fieldset

First, add the module:

    FieldsetModule
  
Then add the markup around the radios:
    
    <p-fieldset legend="Project Type" class="ui-g-12">
            <p-radioButton name="projGroup" label="Front End" value="F" formControlName="projectType"></p-radioButton>
            <p-radioButton name="projGroup" label="Backend End" value="B" formControlName="projectType"></p-radioButton>
            <p-radioButton name="projGroup" label="Operations" value="O" formControlName="projectType"></p-radioButton>
          </p-fieldset>

The labels are clickable as well.

They can be toggled, and collapsible to:
      
      
      [toggleable]="true" [collapsed]="false"
      
Trap: collapsed="false" (without the square brackets) won't work since you're binding the string "false" which is a true non-zero string in JavaScript. Be warned - if false isn't working, that's why!
      
## Dropdowns with a single developer

If you only need to select a single value, drop downs are the win:

    DropdownModule
    
    
Then we need our backing data object to actually pick from:
  
      private allDevs =[
      
          { label: 'Jill', value: 'Jill Cool'},
          { label: 'Joe', value: 'Joe Cool'},
          { label: 'Mary', value: 'Mary Cool'},
      
      ]

And our form control object property):
    
          selectedDevs: ['']


Then the markup
      
      <p-dropdown id="devs" [options]="allDevs" formControlName="selectedDevs" [filter]="true" class="ui-g-12 ui-md-10"></p-dropdown>
 
## Getting Staff - Multiselect module

First, add the module:

    MultiSelectModule


And our form control object property (note the array for multiselect):

      selectedDevs: [[]]

Finally, we need our markup:

    <label for="devs" class="ui-g-12 ui-md-2">Assigned Devs</label>
    <p-multiSelect id="devs" [options]="allDevs" formControlName="selectedDevs" defaultLabel="Select a Dev or Two" class="ui-g-12 ui-md-10"></p-multiSelect>
    
 Notice the default label.


## Getting Staff - A Listbox approach

First, add the module:

    ListboxModule

Then restyle:
 
    <p-listbox id="devs" [options]="allDevs" [multiple]="true"
          formControlName="selectedDevs"></p-listbox>
 
 
Working with Custom Templates:

Note: This applies to drop downs, multiselects, and many of the components we've already covered.

("item" tells Prime to use custom templates. Let is used for the assignment to that in *ngFor style)


      <p-listbox id="devs" [options]="allDevs"  [multiple]="true" formControlName="selectedDevs" class="ui-g-12 ui-md-10">
        <template let-dev pTemplate="item">

            <img src="http://i.pravatar.cc/100?u={{dev.label}}" class="avatar" />
            <span class="devName">{{dev.value}}</span>


        </template>
      </p-listbox>

And add some styling:
 
     p-listbox /deep/ .ui-listbox {
       width: 100%;
         height: 300px;
     }
     
    .avatar {
      float: left;
      margin: 5px;
      height: 50px;
    }
    
    .devName {
      font-size: large;
      display:inline-block;
      margin:15px 10px 0 10px;
      min-height: 50px;
    }
 
 Add filtering if you like:
 
    [filter]="true"
 
 Reader Exercise: bind to the filter value using the filterValue attribute.
 
 
## Let's rate our module with spinners

Import the module:

    SpinnerModule
    
Then add to the backing property:
    
        rating: [3]
    
Then introduce the markup:

    <p-spinner formControlName="rating" [min]="0" [max]="5" class="ui-g-12 ui-md-10"></p-spinner>
    
Demonstrate min and max working by typing in bigger numbers then rounding down.

## Or sliders if you like:

Import the module:

    SliderModule

Bind to the same property, setting max and min as appropriate:

    <pre class="ui-g-12 ui-md-2">{{ projectForm.getRawValue() | json }}</pre>
          <p-slider id="slider" formControlName="rating" class="ui-g-12 ui-md-10" [min]="0" [max]="5"></p-slider>

 
## Or  a propery star rating components

First, add the module:

    RatingModule
    
   
Then implement the markup:

      <label for="rating" class="ui-g-12 ui-md-2">Project Coolness</label>
      <p-rating id="rating" formControlName="rating" class="ui-g-12 ui-md-10"></p-rating>
      
Or remove the cancel...

    [cancel]=false
    
