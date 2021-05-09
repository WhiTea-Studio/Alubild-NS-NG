/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QualityService } from './quality.service';

describe('Service: Quality', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityService]
    });
  });

  it('should ...', inject([QualityService], (service: QualityService) => {
    expect(service).toBeTruthy();
  }));
});
