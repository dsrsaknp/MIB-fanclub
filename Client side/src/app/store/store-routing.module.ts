import { PaymentComponent } from './store-home/payment/payment.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: StoreHomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'viewMyCart/:userCartID', component: CartViewComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orders', component: OrdersComponent }
  // { path: 'store'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
