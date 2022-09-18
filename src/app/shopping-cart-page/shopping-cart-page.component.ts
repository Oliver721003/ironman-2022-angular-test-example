import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Component({
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  protected readonly form = this.fb.group({
    items: this.fb.array<ShoppingCartItem>([]),
  });

  get items(): FormArray<FormControl<ShoppingCartItem | null>> {
    return this.form.get('items') as FormArray<
      FormControl<ShoppingCartItem | null>
    >;
  }

  private readonly stop$ = new Subject<void>();

  protected total = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.computeTotal();
    this.initData();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  private computeTotal(): void {
    this.items.valueChanges
      .pipe(
        map((items) =>
          items.map((item) => item!.sum).reduce((acc, value) => acc + value, 0)
        ),
        takeUntil(this.stop$)
      )
      .subscribe((total) => (this.total = total));
  }

  private initData(): void {
    this.items.push(
      new FormControl<ShoppingCartItem>(
        new ShoppingCartItem({
          id: 1,
          productId: 1,
          product: new Product({ id: 1, name: '產品 A', price: 999 }),
          count: 1,
        })
      )
    );

    this.items.push(
      new FormControl<ShoppingCartItem>(
        new ShoppingCartItem({
          id: 2,
          productId: 2,
          product: new Product({ id: 2, name: '產品 B', price: 200 }),
          count: 1,
        })
      )
    );
  }
}
