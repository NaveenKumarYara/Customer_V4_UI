import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditJobsComponent } from './view-edit-jobs.component';

describe('ViewEditJobsComponent', () => {
  let component: ViewEditJobsComponent;
  let fixture: ComponentFixture<ViewEditJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
