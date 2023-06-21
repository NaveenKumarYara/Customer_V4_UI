import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelCardsComponent } from './sidepanel-cards.component';

describe('SidepanelCardsComponent', () => {
  let component: SidepanelCardsComponent;
  let fixture: ComponentFixture<SidepanelCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidepanelCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidepanelCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
