import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Product } from '../model/product';
import { ShoppingCartItem } from '../model/shopping-cart-item';
import { ShoppingCartFormComponent } from './shopping-cart-form.component';

@Component({
  template: `<app-shopping-cart-form
    [formControl]="formControl"
  ></app-shopping-cart-form>`,
})
class TestComponent {
  @ViewChild(ShoppingCartFormComponent) itemForm!: ShoppingCartFormComponent;
  formControl = new FormControl();
}

describe('ShoppingCartFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
      ],
      declarations: [ShoppingCartFormComponent, TestComponent],
    }).compileComponents();
  });

  describe('購物車項目元件', () => {
    let component: ShoppingCartFormComponent;
    let fixture: ComponentFixture<ShoppingCartFormComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(ShoppingCartFormComponent);
      component = fixture.componentInstance;
      component.form.patchValue(
        new ShoppingCartItem({
          id: 1,
          productId: 1,
          product: new Product({ id: 1, name: '產品 A', price: 999 }),
          count: 1,
        })
      );
      fixture.detectChanges();
    });

    it('元件應可以被建立', () => expect(component).toBeTruthy());

    it('當輸入數量為 0, 應顯示錯誤訊訊為 "數量最小為 1"', async () => {
      // Arrange
      const formFieldElement = fixture.debugElement.query(
        By.directive(MatFormField)
      );
      const inputElement: HTMLInputElement = formFieldElement.query(
        By.css('input')
      ).nativeElement;

      // Act
      inputElement.value = '0';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      // Assert
      const errorElement = formFieldElement.query(By.directive(MatError));
      expect(errorElement.nativeElement.textContent.trim()).toBe(
        '數量最小為 1'
      );
    });
  });

  describe('購物車項目表單元件', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('當指定表單值, 驗證其元件內表單值正確性 (model -> view)', () => {
      // Arrange
      const item = new ShoppingCartItem({
        id: 1,
        productId: 1,
        product: new Product({ id: 1, name: '產品 A', price: 999 }),
        count: 1,
      });

      // Act
      component.formControl.patchValue(item);
      fixture.detectChanges();

      // Assert
      expect(component.itemForm.formData).toEqual(
        new ShoppingCartItem({
          id: 1,
          productId: 1,
          product: new Product({ id: 1, name: '產品 A', price: 999 }),
          count: 1,
        })
      );
    });

    it('當輸入表單資料, 驗證表單值正確性 (view -> model)', async () => {
      // Arrange
      const item = new ShoppingCartItem({
        id: 1,
        productId: 1,
        product: new Product({ id: 1, name: '產品 A', price: 999 }),
        count: 1,
      });
      component.formControl.patchValue(item);
      fixture.detectChanges();

      // Act
      const inputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElement.value = '2';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      // Assert
      expect(component.formControl.value).toEqual(
        new ShoppingCartItem({
          id: 1,
          productId: 1,
          product: new Product({ id: 1, name: '產品 A', price: 999 }),
          count: 2,
        })
      );
    });

    it('當頁面載入後, 表單驗證應為不通過', () => {
      // Arrange
      const item = new ShoppingCartItem({
        id: 1,
        productId: 1,
        product: new Product({ id: 1, name: '產品 A', price: 999 }),
        count: 1,
      });
      component.formControl.patchValue(item);
      fixture.detectChanges();

      // Act
      const inputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElement.value = '0';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      // Assert
      expect(component.itemForm.form.valid).toBeFalsy();
      expect(component.formControl.valid).toBeFalsy();
    });

    it('當資料完整輸入後, 表單驗證應為通過', () => {
      // Arrange
      const item = new ShoppingCartItem({
        id: 1,
        productId: 1,
        product: new Product({ id: 1, name: '產品 A', price: 999 }),
        count: 1,
      });
      component.formControl.patchValue(item);
      fixture.detectChanges();

      // Act
      const inputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElement.value = '2';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      // Assert
      expect(component.itemForm.form.valid).toBeTruthy();
      expect(component.formControl.valid).toBeTruthy();
    });
  });
});
