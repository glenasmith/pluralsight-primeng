
# Forms

Reactive is the way to go. Much more configurable than Template Driven.

Import the ReactiveFormsModule before you start!
 
     imports: [
       BrowserModule,
       FormsModule,
       ReactiveFormsModule,
       

## Create a basic reactive form

       <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="ui-g">
       
         <p-panel header="New Project" class="ui-g-12">
       
           <div class="ui-g">
       
             <label for="projectId" class="ui-g-12 ui-md-2">Project Id</label>
             <input id="projectId" formControlName="projectId" placeholder="Enter Your Project Id" class="ui-g-12 ui-md-5"/>
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

    startDate: ['', Validators.required]

Then the markup:


    <label for="startDate" class="ui-g-12 ui-md-2">Start Date</label>
    <p-calendar [showIcon]="true" id="startDate" formControlName="startDate" class="ui-g-12 ui-md-5"></p-calendar>
    <div class="ui-g-12 ui-md-5">
    
            <at-fielderrors [form]="projectForm" field="startDate" nicename="Start Date"> </at-fielderrors>
    
    </div>
    
## Let's rate this project

First, add the module:

    RatingModule
    
Then add to the backing property:

    rating: ''
   
Then implement the markup:

      <label for="rating" class="ui-g-12 ui-md-2">Project Coolness</label>
      <p-rating id="rating" formControlName="rating" class="ui-g-12 ui-md-10"></p-rating>
      
Or remove the cancel...

    [cancel]=false
    

