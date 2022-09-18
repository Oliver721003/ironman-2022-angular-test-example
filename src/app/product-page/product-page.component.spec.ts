import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { Product } from '../model/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductPageComponent } from './product-page.component';

const products = [
  new Product({ id: 1, name: '產品 A', price: 999 }),
  new Product({ id: 2, name: '產品 B', price: 200 }),
  new Product({ id: 3, name: '產品 C', price: 10 }),
];

@Injectable({
  providedIn: 'root',
})
export class ProductSpyService {
  getProducts(): Observable<Product[]> {
    return of(products);
  }
}

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      declarations: [ProductPageComponent, ProductCardComponent],
      providers: [
        ShoppingCartService,
        // Option 1 - 自訂假的產品服務
        // { provide: ProductService, useClass: ProductSpyService },
        // Option 2 - 使用 SpyOn 方法模擬
        ProductService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('元件應可以被建立', () => expect(component).toBeDefined());

  it('當後端服務回傳 3 筆產品資料, 頁面應顯示 3 個產品卡片', () => {
    // Arrange
    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(products));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    var cards = fixture.debugElement.queryAll(
      By.directive(ProductCardComponent)
    );
    expect(cards.length).toBe(3);
  });
});
