/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabakeraService } from './tabakera.service';

describe('Service: Tabakera', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabakeraService]
    });
  });

  it('should ...', inject([TabakeraService], (service: TabakeraService) => {
    expect(service).toBeTruthy();
  }));
});
