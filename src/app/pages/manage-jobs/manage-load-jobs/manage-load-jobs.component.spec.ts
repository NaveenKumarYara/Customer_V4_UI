import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoadJobsComponent } from './manage-load-jobs.component';

describe('ManageLoadJobsComponent', () => {
  let component: ManageLoadJobsComponent;
  let fixture: ComponentFixture<ManageLoadJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLoadJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLoadJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
