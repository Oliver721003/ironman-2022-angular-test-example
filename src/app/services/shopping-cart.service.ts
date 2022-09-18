import { ShoppingCartItem } from './../model/shopping-cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private items: ShoppingCartItem[] = [];

  constructor() {}
}
