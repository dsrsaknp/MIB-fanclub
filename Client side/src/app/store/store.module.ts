import { FilterDialogComponent } from './store-home/filter-dialog/filter-dialog.component';
import { FilterPipe } from './store-home/products/filter.pipe';
import { ProductsComponent } from './store-home/products/products.component';
import { SearchFilterPipe } from './../search-filter.pipe';
import { SearchProductComponent } from './store-home/search-product/search-product.component';
import { MaterialModule } from './../material.module';
import { FilterComponent } from './store-home/filter/filter.component';
import { CartComponent } from './store-home/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ItemComponent } from './item/item.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './store-home/payment/payment.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ItemComponent,
    StoreHomeComponent,
    CartComponent,
    FilterComponent,
    SearchProductComponent,
    SearchFilterPipe,
    PaymentComponent,
    ProductsComponent,
    FilterPipe,
    CartViewComponent,
    FilterDialogComponent,
    OrdersComponent
  ],
  entryComponents: [
    FilterDialogComponent
  ]
})
export class StoreModule { }
