import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistTablelayoutComponent } from './joblist-tablelayout.component';

describe('JoblistTablelayoutComponent', () => {
  let component: JoblistTablelayoutComponent;
  let fixture: ComponentFixture<JoblistTablelayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoblistTablelayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistTablelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
