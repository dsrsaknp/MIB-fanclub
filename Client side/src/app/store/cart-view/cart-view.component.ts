import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from '../../shared-services/store.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {


  public userCartID: any;
  private myCart: any;
  private cartItems: any;
  private removeItem: any;
  private items = 0;
  private price = 0;
  private total = 0;
  private modifyItem: any;
  private user: any;
  private product: any;
  private modifyAvailability: any;

  constructor(private activatedRouter: ActivatedRoute, private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    if (this.activatedRouter.paramMap) {
      this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
        this.userCartID = params.get('userCartID');
        this.getUserCart();

      });
    }
  }

  reloadCart() {
    this.items = 0;
    this.price = 0;
    this.total = 0;
    this.getUserCart();
  }

  getUserCart() {
    this.storeService.getUserCartItems(this.userCartID).subscribe(cartItems => {
      this.myCart = cartItems;
      this.cartItems = this.myCart.items;
      this.cartItems.forEach(item => {
        this.items = this.items + item.qty;
        this.price = item.qty * item.price;
        this.total = this.total + this.price;
      });
    });

  }

  addToUserCart(data) {
    this.items = this.items + 1;
    this.total = this.total + parseInt(data, 10);
  }

  removeFromUserCart(data) {
    this.items = this.items - 1;
    this.total = this.total - parseInt(data, 10);
  }



  increaseQty(item) {
    this.modifyItem = {
      'user': this.myCart.user,
      'item': item
    };
    this.storeService.incrementQuantity(JSON.stringify(this.modifyItem)).subscribe(data => {
      if (data) {
        this.reloadCart();

        this.modifyAvailability = {
          'productId': item.id
        };
        this.storeService.decrementAvailability(JSON.stringify(this.modifyAvailability)).subscribe(value => {
        });
      }
    });
    // this.storeService.cartViewEvent.emit('cartviewEmittedOnIncrement');
    this.addToUserCart(this.modifyItem.item.price);
  }

  decreaseQty(item) {
    this.modifyItem = {
      'user': this.myCart.user,
      'item': item
    };
    this.storeService.decrementQuantity(JSON.stringify(this.modifyItem)).subscribe(data => {
      if (data) {
        this.reloadCart();
        this.modifyAvailability = {
          'productId': item.id
        };
        this.storeService.incrementAvailability(JSON.stringify(this.modifyAvailability)).subscribe(value => {
        });
      }
    });
    this.removeFromUserCart(this.modifyItem.item.price);

  }
  backToProductsPage() {
    this.router.navigate(['/store']);
  }
  islowQty(itemQuantity) {
    if (itemQuantity <= 1) {
      return true;
    }
    return false;
  }

  removeAll() {
    this.cartItems.forEach(item => {
      this.remove(item);
      this.reloadCart();
    });
  }

  remove(item) {
    this.removeItem = {
      'user': this.myCart.user,
      'item': item
    };
    this.storeService.removeOneItem(JSON.stringify(this.removeItem)).subscribe(data => {
    });
    this.reloadCart();
  }

  proceed() {
    if (sessionStorage.getItem('itemAdded')) {
      sessionStorage.removeItem('itemAdded');
    }
    if(this.items !== 0) {
    this.router.navigate(['store/payment']);

    }
  }
}
