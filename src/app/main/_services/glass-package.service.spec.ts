/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlassPackageService } from './glass-package.service';

describe('Service: GlassPackage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlassPackageService]
    });
  });

  it('should ...', inject([GlassPackageService], (service: GlassPackageService) => {
    expect(service).toBeTruthy();
  }));
});
