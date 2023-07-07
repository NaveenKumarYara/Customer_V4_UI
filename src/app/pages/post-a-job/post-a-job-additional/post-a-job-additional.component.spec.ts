import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobAdditionalComponent } from './post-a-job-additional.component';

describe('PostAJobAdditionalComponent', () => {
  let component: PostAJobAdditionalComponent;
  let fixture: ComponentFixture<PostAJobAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAJobAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAJobAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
