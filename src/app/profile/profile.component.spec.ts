import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {
  DataTableModule, DragDropModule, FieldsetModule, GalleriaModule, GrowlModule,
  PanelModule
} from "primeng/primeng";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import createSpy = jasmine.createSpy;
import { By } from "@angular/platform-browser";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [GrowlModule, GalleriaModule, DragDropModule, PanelModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
