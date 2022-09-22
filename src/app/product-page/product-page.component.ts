import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  protected products$!: Observable<Product[]>;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  onGoto(id: number): void {
    void this.router.navigate(['product', 'detail', id]);
  }
}
