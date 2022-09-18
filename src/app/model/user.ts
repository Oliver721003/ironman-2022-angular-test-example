import { NullablePartial } from '../type/nullable-partial.type';

export class User {
  constructor(initData?: NullablePartial<User>) {
    Object.assign(this, initData);
  }

  id!: string;

  password!: string;
}
