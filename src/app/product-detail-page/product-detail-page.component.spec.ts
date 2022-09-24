import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { ProductService } from '../services/product.service';
import { ProductDetailPageComponent } from './product-detail-page.component';

describe('ProductDetailPageComponent', () => {
  let component: ProductDetailPageComponent;
  let fixture: ComponentFixture<ProductDetailPageComponent>;

  let activatedRoute: ActivatedRouteStub;

  let productService: Partial<ProductService>;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub({ id: '1' });

    productService = {
      getProduct: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [ProductDetailPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ProductService, useValue: productService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('元件應可以被建立', () => expect(component).toBeTruthy());

  it('頁面載入時, 應取得 id 為 1 的產品', () => {
    // Arrange

    // Act

    // Assert
    expect(productService.getProduct).toHaveBeenCalledWith(1);
  });
});
