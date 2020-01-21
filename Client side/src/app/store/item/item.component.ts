import { MatDialog } from '@angular/material';
import { RegisterComponent } from './../../core/register/register.component';
import { LoginComponent } from './../../core/login/login.component';
import { map } from 'rxjs/operators/map';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StoreService } from '../../shared-services/store.service';
import { HandleApiErrorService } from '../../handle-api-error.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  private userName: any;
  private isLoggedIn = false;
  private showModalToLogin = false;
  private item: any;
  private quantity = 0;
  private userEmail: any;
  public productId = '';
  public productData =
    {
      name: '',
      category: ''
    }
    ;
  constructor(private activatedRouter: ActivatedRoute, private storeService: StoreService, private apiError: HandleApiErrorService
    , private titleService: Title, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('userName')) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
    }

    if (this.activatedRouter.paramMap) {
      this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
        this.productId = params.get('id');
        this.getProduct(this.productId);

      });
    }

  }

  getProduct(value) {
    this.storeService.getProductDetails(value).subscribe(
      data => {
        this.setData(data);
      },
      error => {
        this.apiError.apiError.emit(true);
      }
    );
  }
  setData(data) {

    this.productData = data;
    this.titleService.setTitle(this.productData.name);
    // console.log("productdata:::::",data);

  }

  addToCart(product) {
    if (!this.isLoggedIn) {
      this.showModalToLogin = true;   // Not logged in
    } else {
      // LOGGED IN, add item to the cart
      // this.addToCartClicked = true;
      // this.addedToCartClicked = true;

      // SEND ITEM TO ADD AND INCREMENT ITS QUANTITY, OF THE ACTIVE USER
      this.item = {
        'userEmail': this.userEmail,
        'itemID': product._id,
        'itemName': product.name,
        'itemPrice': product.price,
        'itemQty': this.quantity,
        'itemColor': product.color
      };
      this.storeService.addItemToCart(JSON.stringify(this.item)).subscribe(data => {
        this.storeService.cartEvent.emit(this.item.itemPrice);
        // update availibility
        // this.storeService.updateAvailability(product._id).subscribe(data =>{
        //     console.log("Availability decremented by one : ", data);
        // });
      });
    }
  }

  proceedToCheckout(data) {
    if (!this.isLoggedIn) {
      this.showModalToLogin = true;   // Not logged in
    } else {
    sessionStorage.setItem('itemAdded', this.productId);
    this.router.navigate(['/store/payment']);
  }
  }


  login() {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      height: '75%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
}
