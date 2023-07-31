import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobSalaryLocationComponent } from './post-a-job-salary-location.component';

describe('PostAJobSalaryLocationComponent', () => {
  let component: PostAJobSalaryLocationComponent;
  let fixture: ComponentFixture<PostAJobSalaryLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAJobSalaryLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAJobSalaryLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
