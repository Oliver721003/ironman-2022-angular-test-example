import { TestBed } from '@angular/core/testing';

import { OrderPriceComputeService } from './order-price-compute.service';

describe('OrderPriceComputeService', () => {
  let service: OrderPriceComputeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPriceComputeService);
  });

  it('服務應可以被建立', () => expect(service).toBeDefined());

  it('購物總金額為 900 時，不享有任何折扣，付款金額應為 900', () => {
    // Arrange
    const values = [500, 400];

    // Act
    var actual = service.compute(values);

    // Assert
    expect(actual).toBe(900);
  });

  it('購物總金額為 2000 時，不享有任何折扣，付款金額應為 1900', () => {
    // Arrange
    const values = [500, 400, 1100];

    // Act
    var actual = service.compute(values);

    // Assert
    expect(actual).toBe(1900);
  });

  it('購物總金額為 3500 時，不享有任何折扣，付款金額應為 3150', () => {
    // Arrange
    const values = [1500, 900, 1100];

    // Act
    var actual = service.compute(values);

    // Assert
    expect(actual).toBe(3150);
  });

  it('購物總金額為 6000 時，不享有任何折扣，付款金額應為 4800', () => {
    // Arrange
    const values = [1500, 1400, 1100, 2000];

    // Act
    var actual = service.compute(values);

    // Assert
    expect(actual).toBe(4800);
  });
});
