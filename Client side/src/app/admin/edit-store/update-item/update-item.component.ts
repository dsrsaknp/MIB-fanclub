import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HandleApiErrorService } from '../../../handle-api-error.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  filters;
  filtersByCategory;
  updateProductForm: FormGroup;
  editedProduct: any;
  ProductsCategory = ['Shoes', 'Accessories', 'Clothing'];
  ProductsType = ['tshirt', 'sports', 'pullover', 'lower', 'watch', 'bag', 'shoes'];
  editedproductPrice: any = '';
  editedproductAvailability: any = '';
  editedproductSpecification: any = '';
  editedproductimageURL: any = '';
  editedproductRating: any = '';
  editedPid: any = '';
  editedproductCategory: any = '';
  editedproductType: any = '';
  editedproductName: any = '';
  inProgress = false;
  // tslint:disable-next-line:max-line-length
  constructor(private storeService: StoreService, private fb: FormBuilder, private activatedRouter: ActivatedRoute,
    private router: Router, private apiError: HandleApiErrorService) {
    this.updateProductForm = fb.group({
      // tslint:disable-next-line:max-line-length
      'name' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'), Validators.minLength(5), Validators.maxLength(20)])],
      'img': [null, Validators.compose([Validators.required, Validators.pattern('^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$')])],
      'specification' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'price' : [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      'rating' : [null, Validators.compose([Validators.required, Validators.pattern('^[0-5]$')])],
      'availability' : [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      'typep': [null, Validators.required],
      'category': [null, Validators.required]
    });
   }

  ngOnInit() {
    if (this.activatedRouter) {
      this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
        this.editedPid = params.get('id');
        this.getProduct(this.editedPid);

      });
    }

    this.storeService.getFilters().subscribe(data => {
      this.filters = data;
    });
  }
  getProduct(value) {
    this.inProgress = true;
    this.storeService.getProductDetails(value).subscribe(
      data => {
        this.editedProduct = data;
        this.showProductDetails();
      },
      error => {
        this.apiError.apiError.emit(true);
      }
    );
  }
  showProductDetails() {
    this.editedproductName = this.editedProduct.name;
    this.editedproductType = this.editedProduct.type;
    this.editedproductCategory = this.editedProduct.category;
    this.editedproductRating = this.editedProduct.rating;
    this.editedproductPrice = this.editedProduct.price;
    this.editedproductAvailability = this.editedProduct.availability;
    this.editedproductSpecification = this.editedProduct.specification;
    this.editedproductimageURL = this.editedProduct.imageURL;

    this.inProgress = false;
  }
  updateProduct() {
    const obj = {
      pid: this.editedPid,
      name: this.editedproductName,
      type: this.editedproductType,
      category: this.editedproductCategory,
      rating: this.editedproductRating,
      price: this.editedproductPrice,
      availability: this.editedproductAvailability,
      specification: this.editedproductSpecification,
      imageURL: this.editedproductimageURL
    };
    this.storeService.updateProduct(obj).subscribe(item => {
      this.getProduct(this.editedPid);
    });
    this.router.navigate(['/admin/store']);
  }
  restDetails() {
    this.getProduct(this.editedPid);
  }
  changeType(type) {
    this.editedproductType = type;
  }
  changeCategory(category) {
    this.editedproductCategory = category;
    this.getTypeByCategory(this.editedproductCategory);

  }

  getTypeByCategory(data) {
    this.storeService.getFiltersByCategory(data).subscribe(res => {
      this.filtersByCategory = res;
    });
  }
}
