import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistGridlayoutComponent } from './joblist-gridlayout.component';

describe('JoblistGridlayoutComponent', () => {
  let component: JoblistGridlayoutComponent;
  let fixture: ComponentFixture<JoblistGridlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoblistGridlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistGridlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
