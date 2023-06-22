import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentjobsCountComponent} from './recentjobscount.component';

describe('DashboardRecentjobsComponent', () => {
  let component: RecentjobsCountComponent;
  let fixture: ComponentFixture<RecentjobsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentjobsCountComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentjobsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
