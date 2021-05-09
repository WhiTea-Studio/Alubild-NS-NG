/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlassQualityService } from './glass-quality.service';

describe('Service: GlassQuality', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlassQualityService]
    });
  });

  it('should ...', inject([GlassQualityService], (service: GlassQualityService) => {
    expect(service).toBeTruthy();
  }));
});
