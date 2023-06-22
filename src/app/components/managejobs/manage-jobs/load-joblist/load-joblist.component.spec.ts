import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadJoblistComponent } from './load-joblist.component';

describe('LoadJoblistComponent', () => {
  let component: LoadJoblistComponent;
  let fixture: ComponentFixture<LoadJoblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadJoblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadJoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
