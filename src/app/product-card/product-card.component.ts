import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from '../model/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  @HostBinding('class') class = 'product-card';

  constructor(
    private snackBar: MatSnackBar,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  onAdd(): void {
    this.shoppingCartService.add(this.product);
    this.snackBar.open('己增加至購物車');
  }
}
