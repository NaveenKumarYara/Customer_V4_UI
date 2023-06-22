import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshareJobComponentComponent } from './ashare-job-component.component';

describe('AshareJobComponentComponent', () => {
  let component: AshareJobComponentComponent;
  let fixture: ComponentFixture<AshareJobComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshareJobComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshareJobComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
