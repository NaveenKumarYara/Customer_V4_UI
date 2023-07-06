import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobClientInformationComponent } from './post-a-job-client-information.component';

describe('PostAJobClientInformationComponent', () => {
  let component: PostAJobClientInformationComponent;
  let fixture: ComponentFixture<PostAJobClientInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAJobClientInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAJobClientInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
