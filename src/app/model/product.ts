import { NullablePartial } from '../type/nullable-partial.type';

export class Product {
  constructor(initData?: NullablePartial<Product>) {
    Object.assign(this, initData);
  }

  id!: number;

  name!: string;

  price!: number;
}
