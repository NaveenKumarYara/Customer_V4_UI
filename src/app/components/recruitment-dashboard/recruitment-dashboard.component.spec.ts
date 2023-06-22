import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentDashboardComponent } from './recruitment-dashboard.component';

describe('RecruitmentDashboardComponent', () => {
  let component: RecruitmentDashboardComponent;
  let fixture: ComponentFixture<RecruitmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
