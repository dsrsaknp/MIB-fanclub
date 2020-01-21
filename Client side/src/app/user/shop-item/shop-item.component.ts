import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from '../../shared-services/store.service';
import { HandleApiErrorService } from '../../handle-api-error.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

  public productId = '';
  public productData =
    {
      name: '',
      category: ''
    }
    ;
  constructor(private activatedRouter: ActivatedRoute, private storeService: StoreService, private apiError: HandleApiErrorService) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
      this.storeService.getProductDetails(this.productId).subscribe(
        data => {
          this.setData(data);
        },
        error => {
          this.apiError.apiError.emit(true);
        }
      );

    });
  }
  setData(data) {
    this.productData = data;
    // console.log("productdata:::::",data);

  }

}
