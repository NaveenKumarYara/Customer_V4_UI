import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdocumentManagerComponent } from './cdocument-manager.component';

describe('CdocumentManagerComponent', () => {
  let component: CdocumentManagerComponent;
  let fixture: ComponentFixture<CdocumentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdocumentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdocumentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
