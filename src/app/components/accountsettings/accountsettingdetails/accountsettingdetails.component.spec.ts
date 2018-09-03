import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsettingdetailsComponent } from './accountsettingdetails.component';

describe('AccountsettingdetailsComponent', () => {
  let component: AccountsettingdetailsComponent;
  let fixture: ComponentFixture<AccountsettingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsettingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsettingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
