import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobSkillsComponent } from './post-a-job-skills.component';

describe('PostAJobSkillsComponent', () => {
  let component: PostAJobSkillsComponent;
  let fixture: ComponentFixture<PostAJobSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAJobSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAJobSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
