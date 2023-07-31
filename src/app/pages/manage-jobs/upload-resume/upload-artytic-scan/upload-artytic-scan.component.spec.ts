import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArtyticScanComponent } from './upload-artytic-scan.component';

describe('UploadArtyticScanComponent', () => {
  let component: UploadArtyticScanComponent;
  let fixture: ComponentFixture<UploadArtyticScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadArtyticScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArtyticScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
