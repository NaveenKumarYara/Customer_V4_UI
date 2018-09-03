import { TestBed, inject } from '@angular/core/testing';

import { JobdetailsService } from './jobdetails.service';

describe('JobdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobdetailsService]
    });
  });

  it('should be created', inject([JobdetailsService], (service: JobdetailsService) => {
    expect(service).toBeTruthy();
  }));
});
