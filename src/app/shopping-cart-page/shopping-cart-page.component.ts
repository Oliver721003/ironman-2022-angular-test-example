import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { map, mergeMap, Subject, takeUntil } from 'rxjs';

import { ShoppingCartItem } from '../model/shopping-cart-item';
import { ShoppingCartService } from '../services/shopping-cart.service';

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

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService
  ) {}

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
    this.shoppingCartService
      .getItems()
      .pipe(
        mergeMap((item) => item),
        map((item) => new FormControl<ShoppingCartItem | null>(item))
      )
      .subscribe((formControl) => this.items.push(formControl));
  }
}
