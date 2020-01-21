import { AdminVideosComponent } from './../admin-videos/admin-videos.component';
import { AdminGalleryComponent } from './../admin-gallery/admin-gallery.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoreComponent } from './edit-store.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from '../../shared-services/store.service';
import { HandleApiErrorService } from '../../handle-api-error.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { Observable } from 'rxjs/Observable';
import { AdminNewsComponent } from './../admin-news/admin-news.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { Component } from '@angular/core';
import * as data from '../../../assets/productData.json';
describe('EditStoreComponent', () => {
  let component: EditStoreComponent;
  // tslint:disable-next-line:prefer-const
  let service: StoreService;
  let fixture: ComponentFixture<EditStoreComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
  CommonModule,
        AdminRoutingModule,
        FormsModule,
        MaterialModule,
        HttpClientModule
      ],
      // tslint:disable-next-line:max-line-length
      declarations: [EditStoreComponent, AdminDashboardComponent, AdminNewsComponent, UpdateItemComponent, AdminGalleryComponent, AdminVideosComponent],
      providers: [StoreService, HandleApiErrorService,
        { provide: Router, useClass: AppRoutingModule },
        { provide:  Router, useClass:  class { navigate =  jasmine.createSpy('navigate'); } } ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should get all products', () => {
    const app = fixture.debugElement.componentInstance;
    // tslint:disable-next-line:no-shadowed-variable
     app.getProducts();
     app.allProducts = [{
      'availability': '15',
      'brand': 'puma',
      'category': 'Clothing',
      'color': 'green',
      'name': 'Green T-shirt',
      'price': '399',
      'rating': '3',
      'type': 'pullover',
      '_id': '5adeb73e914aa915e291588c'
  }, {
      'availability': '20',
      'category': 'Clothing',
      'imageURL': 'https://5.imimg.com/data5/MO/HL/MY-20910541/india-cricket-team-t-shirt-500x500.jpg',
      'name': 'Indian Jersey',
      'price': '299',
      'rating': '3',
      'specification': 'Awesome Jersey',
      'type': 'tshirt',
      '_id': '5aef48ee2aeecc1c24a7a052'
  }, {
      'availability': '20',
      'brand': 'reebok',
      'category': 'Clothing',
      'color': 'red',
      'name': 'Red T-shirt',
      'price': '299',
      'rating': '2',
      'type': 'sports',
      '_id': '5adeb70d914aa915e2914fb0'
  }, {
      'availability': '30',
      'brand': 'casio',
      'category': 'Accessories',
      'color': 'black',
      'name': 'Red Watch',
      'price': '599',
      'rating': '5',
      'type': 'tshirt',
      '_id': '5adeb78b914aa915e291666b'

  }, {
      'availability': '4',
      'brand': 'reebok',
      'category': 'Accessories',
      'color': 'blue',
      'name': 'Travel Bag',
      'price': '699',
      'rating': '6',
      'type': 'bag',
      '_id': '5adeb7c9914aa915e29171ad'

  },
  {
      'availability': '8',
      'brand': 'adidas',
      'category': 'Shoes',
      'color': 'white',
      'name': 'Runnning Shoes',
      'price': '399',
      'rating': '3',
      'type': 'shoes',
      '_id': '5adeb7f0914aa915e29178b3'

  }];
       expect(app.allProducts).toEqual(data);
   });
   it('should set  category', () => {
    const app = fixture.debugElement.componentInstance;
     app.allProducts = data;
        const filteredData = [  {
      'availability': '15',
      'brand': 'puma',
      'category': 'Clothing',
      'color': 'green',
      'name': 'Green T-shirt',
      'price': '399',
      'rating': '3',
      'type': 'pullover',
      '_id': '5adeb73e914aa915e291588c'
  }, {
      'availability': '20',
      'category': 'Clothing',
      'imageURL': 'https://5.imimg.com/data5/MO/HL/MY-20910541/india-cricket-team-t-shirt-500x500.jpg',
      'name': 'Indian Jersey',
      'price': '299',
      'rating': '3',
      'specification': 'Awesome Jersey',
      'type': 'tshirt',
      '_id': '5aef48ee2aeecc1c24a7a052'
  }, {
      'availability': '20',
      'brand': 'reebok',
      'category': 'Clothing',
      'color': 'red',
      'name': 'Red T-shirt',
      'price': '299',
      'rating': '2',
      'type': 'sports',
      '_id': '5adeb70d914aa915e2914fb0'
  } ];
    const category = 'Clothing';
    app.getcat(category);
     app.allProducts = data;
    // expect(app.allProducts).toEqual(this.data);
    expect(app.getFilteredProducts).toEqual(filteredData);
  });
  it('should get category', () => {
    const app = fixture.debugElement.componentInstance;
    app.allProducts = data;
    const category = 'Clothing';
    expect(app.getcat(category)).toEqual(undefined);
});
it('should sort by category', () => {
  const app = fixture.debugElement.componentInstance;
  app.allProducts = data;
  // const category = 'Clothing';
  expect(app.sortBy('category', 'desc')).toEqual(undefined);
});
it('should edit product', () => {
  const app = fixture.debugElement.componentInstance;
  // const category = 'Clothing';
  expect(app.editProduct('5adeb752914aa915e2915c0a')).toEqual(undefined);
});
it('should load product', () => {
  const app = fixture.debugElement.componentInstance;
  // const category = 'Clothing';
  expect(app.loadProduct('5adeb752914aa915e2915c0a')).toEqual(undefined);
});
it('should del product', () => {
  const app = fixture.debugElement.componentInstance;
  // const category = 'Clothing';
  expect(app.deleteProduct('5adeb752914aa915e2915c0a')).toEqual(undefined);
});
it('should show add product', () => {
  const app = fixture.debugElement.componentInstance;
  // const category = 'Clothing';
  expect(app.showAddProduct()).toEqual(undefined);
});
it('should hide add product', () => {
  const app = fixture.debugElement.componentInstance;
  // const category = 'Clothing';
  expect(app.hideAddProduct()).toEqual(undefined);
});
it('should changeType ', () => {
  const app = fixture.debugElement.componentInstance;
   const type = 'lower';
  expect(app.changeType(type)).toEqual(undefined);
});
it('should changeCategory', () => {
  const app = fixture.debugElement.componentInstance;
   const category = 'Clothing';
  expect(app.changeCategory(category)).toEqual(undefined);
});
it('should add product', () => {
  const app = fixture.debugElement.componentInstance;
    app.productName = 'Blue T-shirt';
  app.productType = 'tshirt',
   app.productCategory = 'Clothing';
   app.productRating = '2';
   app.productPrice = '299';
    app.productAvailability = '0';
    app.productSpecification = 'awesome';
    app.productImage = 'http://static.dnaindia.com/sites/default/files/2017/01/12/537835-team-india-odi-jersey-1.jpeg';
  expect(app.addProduct()).toEqual(undefined);
});

});
