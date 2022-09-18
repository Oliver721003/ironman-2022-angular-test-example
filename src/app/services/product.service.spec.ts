import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../model/product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('服務應可以被建立', () => expect(service).toBeDefined());

  it('應該可以取得產品資料', () => {
    // Arrange

    // Act
    service.getProducts().subscribe((actual) => {
      expect(actual).toEqual([
        new Product({ id: 1, name: '產品 A', price: 999 }),
        new Product({ id: 2, name: '產品 B', price: 200 }),
        new Product({ id: 3, name: '產品 C', price: 10 }),
        new Product({ id: 4, name: '產品 D', price: 150 }),
      ]);
    });

    // Assert
    const testRequest = httpMock.expectOne('http://localhost:3000/products');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([
      { id: 1, name: '產品 A', price: 999 },
      { id: 2, name: '產品 B', price: 200 },
      { id: 3, name: '產品 C', price: 10 },
      { id: 4, name: '產品 D', price: 150 },
    ]);
  });
});
