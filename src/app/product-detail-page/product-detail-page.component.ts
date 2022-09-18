import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  product$!: Observable<Product>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')!),
      switchMap((id) => this.productService.getProduct(+id))
    );
  }

  onCancel(): void {
    this.router.navigate(['product', 'list']);
  }
}
