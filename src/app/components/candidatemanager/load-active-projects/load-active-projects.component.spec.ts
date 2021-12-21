import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadActiveProjectsComponent } from './load-active-projects.component';

describe('LoadActiveProjectsComponent', () => {
  let component: LoadActiveProjectsComponent;
  let fixture: ComponentFixture<LoadActiveProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadActiveProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadActiveProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
