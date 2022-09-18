import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  @HostBinding('class') class = 'product-card';

  constructor() {}

  ngOnInit(): void {}
}
