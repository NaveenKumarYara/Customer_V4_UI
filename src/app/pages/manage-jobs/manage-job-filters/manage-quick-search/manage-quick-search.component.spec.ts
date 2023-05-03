import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuickSearchComponent } from './manage-quick-search.component';

describe('ManageQuickSearchComponent', () => {
  let component: ManageQuickSearchComponent;
  let fixture: ComponentFixture<ManageQuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuickSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
