import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteProfiledialogComponent } from './invite-profiledialog.component';

describe('InviteProfiledialogComponent', () => {
  let component: InviteProfiledialogComponent;
  let fixture: ComponentFixture<InviteProfiledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteProfiledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteProfiledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
