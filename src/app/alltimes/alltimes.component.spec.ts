import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltimesComponent } from './alltimes.component';

describe('AlltimesComponent', () => {
  let component: AlltimesComponent;
  let fixture: ComponentFixture<AlltimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
