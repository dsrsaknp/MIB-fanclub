import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { IProducts } from './IProducts';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: any;
  private userName: any;
  private isLoggedIn = false;
  private showModalToLogin = false;
  private clothing: any = [];
  private shoes: any = [];
  private sports: any = [];
  private accessories: any = [];
  private allProducts: any = [];

  constructor( private storeService: StoreService ,private router: Router) { }

  ngOnInit() {
      if (localStorage.getItem('userName')) {
          this.isLoggedIn = true;
          this.userName = localStorage.getItem('userName');
      }
      this.storeService.getProducts().subscribe(data => {
          console.log('products::', data);
          this.products = data;
          this.allProducts = data;
          this.storeService.notifyFetch.emit(data);
      });
  }

  addToCart(product) {
      if (!this.isLoggedIn) {
        console.log('logged in::::', this.isLoggedIn);
        this.showModalToLogin = true;
        console.log('showModalToLogin::::::::', this.showModalToLogin);
      }
  }

  showClothingCategory() {
      this.products = this.allProducts;
      // tslint:disable-next-line:no-shadowed-variable
      this.products.forEach(element => {
          if (element.category === 'SportsWear') {
              this.sports.push(element);
              this.products = this.sports;
          }
      });
  }

  showShoesCategory() {
        this.products = this.allProducts;
        // tslint:disable-next-line:no-shadowed-variable
        this.products.forEach(element => {
            if (element.category === 'Clothing') {
                this.clothing.push(element);
                this.products = this.clothing;
            }
        });
  }

  loadProduct(id) {
    //   console.log("id::::", id);
      this.router.navigate(['/user/store/products', id]);
  }
  showAccessoriesCategory() {
        this.products = this.allProducts;
        // tslint:disable-next-line:no-shadowed-variable
        this.products.forEach(element => {
            if (element.category === 'Accessories') {
                this.accessories.push(element);
                this.products = this.accessories;
            }
        });
  }

  showSportsCategory() {
        this.products = this.allProducts;
        // tslint:disable-next-line:no-shadowed-variable
        this.products.forEach(element => {
            if (element.category === 'Shoes') {
                this.shoes.push(element);
                this.products = this.shoes;
            }
        });
  }
  showAllCategories() {
    this.products = this.allProducts;
  }
}

