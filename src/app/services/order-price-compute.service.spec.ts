import { TestBed } from '@angular/core/testing';

import { OrderPriceComputeService } from './order-price-compute.service';

xdescribe('OrderPriceComputeService', () => {
  let service: OrderPriceComputeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPriceComputeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
