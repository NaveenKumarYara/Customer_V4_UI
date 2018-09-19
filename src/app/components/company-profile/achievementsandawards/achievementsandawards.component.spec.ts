import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsandawardsComponent } from './achievementsandawards.component';

describe('AchievementsandawardsComponent', () => {
  let component: AchievementsandawardsComponent;
  let fixture: ComponentFixture<AchievementsandawardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsandawardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsandawardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
