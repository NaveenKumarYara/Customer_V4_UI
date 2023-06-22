import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultModelsComponent } from './default-models.component';

describe('DefaultModelsComponent', () => {
  let component: DefaultModelsComponent;
  let fixture: ComponentFixture<DefaultModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
