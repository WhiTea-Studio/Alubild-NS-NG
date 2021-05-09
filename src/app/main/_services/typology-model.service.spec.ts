/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypologyModelService } from './typology-model.service';

describe('Service: TypologyModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypologyModelService]
    });
  });

  it('should ...', inject([TypologyModelService], (service: TypologyModelService) => {
    expect(service).toBeTruthy();
  }));
});
