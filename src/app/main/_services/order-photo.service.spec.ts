/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderPhotoService } from './order-photo.service';

describe('Service: OrderPhoto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPhotoService]
    });
  });

  it('should ...', inject([OrderPhotoService], (service: OrderPhotoService) => {
    expect(service).toBeTruthy();
  }));
});
