import {Component, OnInit, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'at-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private projectForm : FormGroup;

  private allDevs =[

    { label: 'Jill', value: 'Jill Cool'},
    { label: 'Joe', value: 'Joe Cool'},
    { label: 'Mary', value: 'Mary Cool'},

  ]




  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectId: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      rating: [''],
      selectedDevs: [[]]
    })
  }

  hasFormErrors() {
    return !this.projectForm.valid;
  }

  fieldErrors(field : string) {
    let controlState = this.projectForm.controls[field];
    return  (controlState.errors && controlState.dirty) ? controlState.errors : null;
  }

}
