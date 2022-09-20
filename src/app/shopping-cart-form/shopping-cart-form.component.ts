import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart-form',
  templateUrl: './shopping-cart-form.component.html',
  styleUrls: ['./shopping-cart-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShoppingCartFormComponent),
      multi: true,
    },
  ],
})
export class ShoppingCartFormComponent implements OnInit, OnDestroy {
  @Output() protected delete = new EventEmitter<void>();

  readonly form = this.fb.group({
    id: this.fb.control<number | null>(null),
    productId: this.fb.control<number | null>(null),
    product: this.fb.control<Product | null>(null),
    count: this.fb.control<number | null>(1, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  get formData(): ShoppingCartItem {
    return new ShoppingCartItem(this.form.value);
  }

  get product(): FormControl<Product | null> {
    return this.form.get('product') as FormControl<Product | null>;
  }

  get count(): FormControl<number | null> {
    return this.form.get('count') as FormControl<number | null>;
  }

  get sum(): number {
    return this.product.value!.price * (this.count.value || 1);
  }

  @HostBinding('class') class = 'shopping-cart-form';

  onChange!: (_: ShoppingCartItem) => void;

  onTouched!: () => void;

  private readonly stop$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.stop$))
      .subscribe(() => this.notifyValueChange());
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.formData);
    }
  }

  writeValue(data: ShoppingCartItem): void {
    if (data) {
      this.form.patchValue(data);
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
