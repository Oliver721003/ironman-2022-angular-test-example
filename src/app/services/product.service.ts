import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly products = [
    new Product({ id: 1, name: '產品 A', price: 999 }),
    new Product({ id: 2, name: '產品 B', price: 200 }),
    new Product({ id: 3, name: '產品 C', price: 10 }),
    new Product({ id: 4, name: '產品 D', price: 150 }),
  ];

  constructor() {}

  getProduct(id: number): Observable<Product> {
    return of(this.products.find((product) => product.id === id)!);
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
