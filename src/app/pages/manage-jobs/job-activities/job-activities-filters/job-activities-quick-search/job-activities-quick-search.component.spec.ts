import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchComponent } from './job-activities-quick-search.component';

describe('ManageQuickSearchComponent', () => {
  let component: QuickSearchComponent;
  let fixture: ComponentFixture<QuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
