import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rForm: FormGroup;
  orderDone;
  private userEmail: any;
  private userCartItems: any = [];
  private confirmOrder: any;
  private streetName: any;
  private doorNum: any;
  private City: any;
  private State: any;
  private Pincode: any;
  private shippingAddress: any;


  dummmyData;
  oneItem = false;
  sum = 0;
  address = {
    email: this.userEmail,
    doorNum: this.doorNum,
    streetName: this.streetName,
    City: this.City,
    State: this.State,
    Pincode: this.Pincode
  };
  constructor(private storeService: StoreService, private router: Router, private fb: FormBuilder) {
    this.rForm = this.fb.group({
      'door': [null],
      'street': [null],
      'city': [null],
      'state': [null],
      'pincode': [null]
    });
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      'door': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(([\',.-][a-zA-Z])?[a-zA-Z]*)*$'), Validators.maxLength(7), Validators.minLength(2)])],
      // tslint:disable-next-line:max-line-length
      'street': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'), Validators.maxLength(15), Validators.minLength(3)])],
      // tslint:disable-next-line:max-line-length
      'city': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z]+$'), Validators.maxLength(15), Validators.minLength(3)])],
      // tslint:disable-next-line:max-line-length
      'state': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$'), Validators.maxLength(15), Validators.minLength(3)])],
      // tslint:disable-next-line:max-line-length
      'pincode': [null, Validators.compose([Validators.required,  Validators.pattern('[1-9]{6}'), Validators.maxLength(6)])]
    });

    this.orderDone = false;
    if (localStorage.getItem('userEmail')) {
      this.userEmail = localStorage.getItem('userEmail');
      if (sessionStorage.getItem('itemAdded')) {
        this.oneItem = true;
        this.storeService.getProductDetails(sessionStorage.getItem('itemAdded')).subscribe(data => {
          this.userCartItems.push(data);
          this.sum = data.price;
        });
      } else {
        this.storeService.getCartItems(this.userEmail).subscribe((data) => {
          this.dummmyData = data;
          this.userCartItems = this.dummmyData.items;
          this.userCartItems.forEach(element => {
            this.sum = this.sum + element.price * element.qty;
          });
        });
      }


    }
  }



  confirm() {
    if (sessionStorage.getItem('itemAdded')) {
      sessionStorage.removeItem('itemAdded');
    }
    this.shippingAddress = {
      'streetName': this.streetName,
      'doorNum': this.doorNum,
      'City': this.City,
      'State': this.State,
      'Pincode': this.Pincode
    };
    this.confirmOrder = {
      'user': this.userEmail,
      'cart': this.userCartItems,
      'address': this.shippingAddress
    };
    this.storeService.confirmOrder(JSON.stringify(this.confirmOrder)).subscribe(data => {
      if (data) {
        console.log(this.userEmail);

        this.storeService.removeAllItems(this.userEmail).subscribe(removed => {
          if (removed) {
          }
        });
      }
    });

    Swal({
      title: 'Order Successful',
      text: 'Go to orders page for details',
      type: 'success',
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'OK!',
  }).then((result) => {
      if (result.value) {
        this.gotoOrders();
  }
});

  }

  gotoOrders() {
    this.router.navigate(['/store/orders']);

  }
}
