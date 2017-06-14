import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {
  DataTableModule, DragDropModule, FieldsetModule, GalleriaModule, GrowlModule,
  PanelModule
} from "primeng/primeng";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import createSpy = jasmine.createSpy;
import {By} from "@angular/platform-browser";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ GrowlModule, GalleriaModule, DragDropModule,
                  PanelModule, NoopAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should stop the slideshow on starting drag', () => {

    let mockGalleria = {
      activeIndex: 2,
      stopSlideshow: createSpy('stopSlideshow')
    }

    component.onDragStart( mockGalleria );
    expect(mockGalleria.stopSlideshow).toHaveBeenCalled();

  });

  it('should update the image on drop', () => {

    let mockGalleria = {
      activeIndex: 2,
      stopSlideshow: createSpy('stopSlideshow')
    }

    component.onDragStart( mockGalleria );
    component.onPicDrop();

    expect(component.profileImage).toEqual("http://i.pravatar.cc/300?u=Mary");

    fixture.detectChanges(); // You need to fire change detection since we changed the property.

    let imgElement = fixture.debugElement.query(By.css('#profilePic')).nativeElement;
    expect(imgElement).toBeTruthy();

  });
});
