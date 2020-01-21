import { LoginComponent } from './../../../core/login/login.component';
import { FilterPipe } from './filter.pipe';
import { element } from 'protractor';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { IProducts } from './IProducts';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../../../core/register/register.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    categoryName = 'All';
    searchText;
    categoryProducts = [];
    private products: any = [];
    filterProducts = [];
    categories;
    private userName: any;
    private isLoggedIn = false;
    private showModalToLogin = false;
    private clothing: any = [];
    private shoes: any = [];
    private sports: any = [];
    private accessories: any = [];
    private allProducts: any = [];
    private item: any;
    private decrementItem: any;
    private quantity = 0;
    private userEmail: any;
    private productAvailability: any;
    private modifyAvailability: any;

    constructor(private storeService: StoreService, private router: Router, private dialog: MatDialog) { }

    ngOnInit() {
        if (localStorage.getItem('userName')) {
            this.isLoggedIn = true;
            this.userName = localStorage.getItem('userName');
            this.userEmail = localStorage.getItem('userEmail');
        }
        this.getProducts();

        this.storeService.searchEvent.subscribe(data => {
            this.searchText = data;
        });

        this.storeService.catetoryEvent.subscribe(data => {
            if (data === 'All') {
                this.products = this.allProducts;
                this.categoryProducts = this.allProducts;
                this.storeService.notifyFetch.emit(this.products);
            } else {
                this.products = this.allProducts.filter(product => product.category === data);
                this.categoryProducts = this.products;
                this.storeService.notifyFetch.emit(this.products);
            }
            this.categoryName = data;
        });

        this.storeService.filterTypeAddEvent.subscribe(data => {
            this.filterProducts.push
                .apply(this.filterProducts, this.categoryProducts.filter(product => product.type === data));
            this.products = this.filterProducts;
        });
        this.storeService.filterTypeRemoveEvent.subscribe(data => {
            this.filterProducts = this.filterProducts.filter(product => !this.categoryProducts
                .filter(value => value.type === data).includes(product));
            if (this.filterProducts.length === 0) {
                this.products = this.categoryProducts;
            } else {
                this.products = this.filterProducts;
            }
        });

        this.storeService.filterBrandAddEvent.subscribe(data => {
            this.filterProducts.push
                .apply(this.filterProducts, this.categoryProducts.filter(product => product.brand === data));
            this.products = this.filterProducts;
        });
        this.storeService.filterBrandRemoveEvent.subscribe(data => {
            this.filterProducts = this.filterProducts.filter(product => !this.categoryProducts
                .filter(value => value.brand === data).includes(product));
            if (this.filterProducts.length === 0) {
                this.products = this.categoryProducts;
            } else {
                this.products = this.filterProducts;
            }
        });
    }


    getProducts() {
        this.storeService.getProducts().subscribe(data => {
            this.allProducts = data;
            this.products = data;
            this.categoryProducts = this.allProducts;
            this.storeService.notifyFetch.emit(this.products);
            this.storeService.catetoryEvent.emit(this.categoryName);
        });

        this.storeService.getFilters().subscribe(data => {
            this.categories = data;
        });
    }

    isProductAvailable(availability) {
        availability = parseInt(availability, 10);
        if (availability === 0) {
            return false; // not available
        }
        return true; // available
    }

    addToCart(product) {
        if (!this.isLoggedIn) {
            this.showModalToLogin = true;   // Not logged in
            return false;
        } else {
            this.decreaseAvailability(product);
            // this.storeService.cartEvent.emit('added');
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
                // });
                if (data) {
                    this.modifyAvailability = {
                        'productId': product._id
                    };
                    this.storeService.decrementAvailability(JSON.stringify(this.modifyAvailability)).subscribe(value => {
                    });
                }
            });
            return true;
        }
    }

    decreaseAvailability(product) {
        this.productAvailability = {
            'product': product
        };
        this.storeService.decrementAvailability(JSON.stringify(this.productAvailability)).subscribe(data => {
        });
    }


    getCategory(data) {

    }

    loadProduct(id) {
        this.router.navigate(['/store/item', id]);
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

