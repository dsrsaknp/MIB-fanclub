import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared-services/store.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private userEmail: any;
  private orders: any;
  dummyOrders;
  orderLength = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    if (localStorage.getItem('userEmail')) {
      this.userEmail = localStorage.getItem('userEmail');
      // If logged in, fetch past orders
      this.storeService.getOrders(this.userEmail).subscribe(data => {
        console.log('past orders::::::', data);
        if (data) {
          this.dummyOrders = data;
          this.orders = this.dummyOrders.items;
         console.log(typeof Object.values(this.dummyOrders.items));
         console.log(typeof this.orders);
         console.log(Object.values(this.orders));
        } else {
          console.log('No orders found');
          // this.orders = null;
        }
      });
    }
  }

}
