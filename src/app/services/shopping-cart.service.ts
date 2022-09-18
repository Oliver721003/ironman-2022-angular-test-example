import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: ShoppingCartItem[] = [
    new ShoppingCartItem({
      id: 1,
      productId: 1,
      product: new Product({ id: 1, name: '產品 A', price: 999 }),
      count: 1,
    }),
    new ShoppingCartItem({
      id: 2,
      productId: 2,
      product: new Product({ id: 2, name: '產品 B', price: 200 }),
      count: 1,
    }),
  ];

  constructor() {}

  getItems(): Observable<ShoppingCartItem[]> {
    return of(this.items);
  }
}
