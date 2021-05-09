/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypologyService } from './typology.service';

describe('Service: Typology', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypologyService]
    });
  });

  it('should ...', inject([TypologyService], (service: TypologyService) => {
    expect(service).toBeTruthy();
  }));
});
