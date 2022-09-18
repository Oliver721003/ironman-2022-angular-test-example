import { NullablePartial } from '../type/nullable-partial.type';
import { Product } from './product';

export class ShoppingCartItem {
  constructor(initData?: NullablePartial<ShoppingCartItem>) {
    Object.assign(this, initData);
  }

  id!: number;

  productId!: number;

  product!: Product;

  count!: number;

  get sum(): number {
    return this.product.price * this.count;
  }
}
