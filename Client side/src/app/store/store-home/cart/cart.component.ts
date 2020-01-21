import { Component, OnInit, EventEmitter } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private useremail: any;
  private cartItems: any;
  private items: any = 0;
  private price: any;
  private total: any = 0;
  private emitCartItems: any;

  constructor(private storeService: StoreService, private router: Router) {

  }

  ngOnInit() {
    this.storeService.cartEvent.subscribe(data => {
      this.items = this.items + 1;
      this.total = this.total + parseInt(data, 10);
    });

    if (localStorage.getItem('userEmail')) {
      // Retreive user if logged in
      this.useremail = localStorage.getItem('userEmail');
      this.storeService.getCartItems(this.useremail).subscribe(cartItems => {
        this.cartItems = cartItems;
        this.cartItems.items.forEach(element => {
          this.items = this.items + element.qty;
          this.price = element.qty * element.price;
          this.total = this.total + this.price;
        });
      });

    }
  }


  loadCartData() {

  }

  viewMyCart(userCartID) {
    this.router.navigate(['/store/viewMyCart', userCartID]);
  }



  reviewOrder() {
    if (localStorage.getItem('userEMail')) {

      this.router.navigate(['/store/orders']);

    }

  }

}
