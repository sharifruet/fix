import { TestBed } from '@angular/core/testing';

import { OrderItemPaymentService } from './order-item-payment.service';

describe('OrderItemPaymentService', () => {
  let service: OrderItemPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderItemPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
