import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobInformationComponent } from './post-a-job-information.component';

describe('PostAJobInformationComponent', () => {
  let component: PostAJobInformationComponent;
  let fixture: ComponentFixture<PostAJobInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAJobInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAJobInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
