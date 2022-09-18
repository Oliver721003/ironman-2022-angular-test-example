import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      declarations: [ProductCardComponent],
      providers: [ShoppingCartService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('元件應可以被建立', () => {
    // Arrange
    component.product = new Product();

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeDefined();
  });

  it('當傳入產品 B 時, 產品名稱應顯示為"產品 B"', () => {
    // Arrange
    const product = new Product({ id: 2, name: '產品 B', price: 200 });
    const productTitleElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;
    const productPriceElement = fixture.debugElement.query(
      By.css('.mat-card-content > div')
    ).nativeElement;

    // Act
    component.product = product;
    fixture.detectChanges();

    // Assert
    expect(productTitleElement.textContent).toBe('產品 B');
    expect(productPriceElement.textContent).toBe('$200.00');
  });

  it('當將產品 C 新增至購物車時, 購物車服務應記錄 1 筆資料', () => {
    // Arrange
    const shoppingCartService = TestBed.inject(ShoppingCartService);

    const product = new Product({ id: 3, name: '產品 C', price: 10 });

    component.product = product;
    fixture.detectChanges();

    // Act
    const button = fixture.debugElement.queryAll(By.css('button'))[1];
    // button.triggerEventHandler('click', null);
    button.nativeElement.click();

    // Assert
    expect(shoppingCartService.items).toEqual([
      new ShoppingCartItem({
        id: 1,
        productId: 3,
        product: product,
        count: 1,
      }),
    ]);
  });
});
