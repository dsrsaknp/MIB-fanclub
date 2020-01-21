import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared-services/store.service';
import { HandleApiErrorService } from '../../handle-api-error.service';
import { Observable } from 'rxjs/Observable';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { IProducts } from './../../store/store-home/products/IProducts';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {
  filters;
  dummyFilters;
  filtersByCategory;
  addPrdouctForm: FormGroup;
  showAddProductDiv = false;
  inProgress = false;
  productImage: any = '';
  productSpecification: any = '';
  productAvailability: any = '';
  productRating: any = '';
  productPrice: any = '';
  productCategory: any = '';
  productType: any = '';
  productName: any = '';
  getFilteredProducts: any;
  allProducts: any;
  categoryName = 'all';
  // sortType = true;
  ProductsCategory = [];
  ProductsType = [];
  // tslint:disable-next-line:max-line-length
  constructor(private storeService: StoreService, private apiErrorService: HandleApiErrorService, private router: Router, fb: FormBuilder) {
    this.addPrdouctForm = fb.group({
      // tslint:disable-next-line:max-line-length
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'), Validators.minLength(5), Validators.maxLength(20)])],
      'img': [null, Validators.compose([Validators.required, Validators.pattern('^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$')])],
      'specification' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      // tslint:disable-next-line:max-line-length
      'price' : [null, Validators.compose([Validators.required, Validators.maxLength(4),  Validators.pattern('^[1-9]+$')])],
      // tslint:disable-next-line:max-line-length
      'availability' : [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(1), Validators.pattern('^[0-9]+$')])],
      'typep': [null, Validators.required],
      'category': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.inProgress = true;
    this.getProducts();
  }
  getProducts() {
    this.storeService.getProducts().subscribe(

      data => {
        this.allProducts = data;
        this.getFilteredProducts = this.allProducts.sort(function (a, b) {
          return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
        this.inProgress = false;
      },
      error => {
        this.apiErrorService.apiError.emit(error);
        this.inProgress = false;

      }
    );
    this.storeService.getFilters().subscribe(data => {
      this.filters = data;
      // this.ProductsCategory = this.allDetails.category;
    });
  }
  getcat(data) {
    if (data === 'all') {
      this.getFilteredProducts = this.allProducts;
    } else {
      this.getFilteredProducts = this.allProducts.filter(product => product.category === data);
    }
  }
  sortBy(data, order) {
    if (data === 'price') {
      if (order === 'asec') {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return Number(producta.price) - Number(productb.price);
        });
      } else {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return Number(productb.price) - Number(producta.price);
        });
      }
    } else if (data === 'availability') {
      if (order === 'asec') {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return Number(producta.availability) - Number(productb.availability);
        });
      } else {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return Number(productb.availability) - Number(producta.availability);
        });
      }
    } else if (data === 'category') {
      if (order === 'asec') {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return (producta.category > productb.category) ? 1 : ((productb.category > producta.category) ? -1 : 0);
        });
      } else {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return (productb.category > producta.category) ? 1 : ((producta.category > productb.category) ? -1 : 0);
        });
      }
    } else {
      if (order === 'asec') {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          return (producta.name > productb.name) ? 1 : ((productb.name > producta.name) ? -1 : 0);
        });
      } else {
        this.getFilteredProducts = this.getFilteredProducts.sort(function (producta, productb) {
          // tslint:disable-next-line:max-line-length
          return (productb.name > producta.name) ? 1 : ((producta.name > productb.name) ? -1 : 0);
        });
      }
    }
  }
  editProduct(id) {
    this.router.navigate(['/admin/update', id]);

  }
  loadProduct(id) {
    this.router.navigate(['/store/item', id]);
  }
  deleteProduct(product) {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
      if (result.value) {
    this.inProgress = true;
    this.storeService.deleteProduct(product).subscribe(res => {
        });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal(
      'Cancelled',
      'Your product is safe :)',
      'error'
    );
  }
});
  }
  showAddProduct() {
    this.showAddProductDiv = true;
  }
  hideAddProduct() {
    this.showAddProductDiv = false;
  }

  addProduct() {
    this.inProgress = true;
    const newProduct = {
      name: this.productName,
      type: this.productType,
      category: this.productCategory,
      imageURL: this.productImage,
      price: this.productPrice,
      rating: this.productRating,
      availability: this.productAvailability,
      specification: this.productSpecification
    };
    this.storeService.addProduct(newProduct).subscribe(res => {
      this.getProducts();
    });
  }
  changeType(type) {
    this.productType = type;
  }
  changeCategory(category) {
    this.productCategory = category;
    this.getTypeByCategory(this.productCategory);
  }

  getTypeByCategory(data) {
    this.storeService.getFiltersByCategory(data).subscribe(res => {
      this.filtersByCategory = res;
    });
  }
}
