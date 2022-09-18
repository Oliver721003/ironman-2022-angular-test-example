import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: ShoppingCartItem[] = [];

  constructor() {}

  getItems(): Observable<ShoppingCartItem[]> {
    return of(this.items);
  }

  add(product: Product): void {
    const id =
      this.items.length === 0
        ? 1
        : Math.max(...this.items.map((item) => item.id)) + 1;
    this.items.push(
      new ShoppingCartItem({
        id,
        productId: product.id,
        product: product,
        count: 1,
      })
    );
  }

  delete(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }
}
