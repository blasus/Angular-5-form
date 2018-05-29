import { TestBed, inject } from '@angular/core/testing';

import { GetServiceService } from './get-service.service';

describe('GetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetServiceService]
    });
  });

  it('should be created', inject([GetServiceService], (service: GetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
