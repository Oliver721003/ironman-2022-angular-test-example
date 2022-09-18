import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';

const routes: Routes = [
  {
    path: 'product',
    children: [
      { path: 'list', component: ProductPageComponent },
      { path: 'detail/:id', component: ProductDetailPageComponent },
    ],
  },
  {
    path: 'shopping-cart',
    children: [{ path: 'list', component: ShoppingCartPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
