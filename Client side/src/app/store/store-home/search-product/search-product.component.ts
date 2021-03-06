import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  public searchData = [
    { name: 'test1' },
    { name: 'test2' }
  ];

  categories;
  categoryName = 'All';
  public stateCtrl = '';


  constructor(private storeService: StoreService, private router: Router) {
  }
  ngOnInit() {

    this.storeService.getFilters().subscribe(data => {
      this.categories = data;
    })

    this.storeService.notifyFetch.subscribe(response => {
      this.searchData = response;
    });
  }

  loadProduct(pId) {
    /**pId is the id of the product ..
     * Use pId to load the product page
     */
    this.router.navigate(['/store/item', pId]);
  }


  getcat(data) {
    this.categoryName = data;
    this.storeService.catetoryEvent.emit(data);
  }

  typingSearch() {
    this.storeService.searchEvent.emit(this.stateCtrl);
  }



}
