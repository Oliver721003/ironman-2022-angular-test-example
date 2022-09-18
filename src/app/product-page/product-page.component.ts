import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  products = [
    new Product({ id: 1, name: '產品 A', price: 999 }),
    new Product({ id: 2, name: '產品 B', price: 200 }),
    new Product({ id: 3, name: '產品 C', price: 10 }),
  ];

  constructor() {}

  ngOnInit(): void {}
}
