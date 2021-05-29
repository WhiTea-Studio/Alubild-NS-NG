/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderItemHelpService } from './order-item-help.service';

describe('Service: OrderItemHelp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderItemHelpService]
    });
  });

  it('should ...', inject([OrderItemHelpService], (service: OrderItemHelpService) => {
    expect(service).toBeTruthy();
  }));
});
