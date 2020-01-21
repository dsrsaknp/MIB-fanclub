import { AdminVideosComponent } from './../../admin-videos/admin-videos.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemComponent } from './update-item.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../shared-services/store.service';
import { HandleApiErrorService } from '../../../handle-api-error.service';
import { EditStoreComponent } from '../edit-store.component';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from '../../admin-routing.module';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminNewsComponent } from './../../admin-news/admin-news.component';
import { AdminGalleryComponent } from './../../admin-gallery/admin-gallery.component';
describe('UpdateItemComponent', () => {
  let component: UpdateItemComponent;
  let fixture: ComponentFixture<UpdateItemComponent>;

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
            declarations: [UpdateItemComponent, EditStoreComponent, AdminDashboardComponent, UpdateItemComponent, AdminNewsComponent, AdminGalleryComponent, AdminVideosComponent],
            providers: [StoreService, HandleApiErrorService,
              { provide: Router, useClass: AppRoutingModule },
              { provide: Router, useClass: AdminRoutingModule },
            {provide: ActivatedRoute},
          {provide: ActivatedRoute.ParamMap}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.getProduct()).toEqual(undefined);
  });

  it('should return nothing', () => {

    const app = fixture.debugElement.componentInstance;
    app.editedProduct =    {
      'name': 'Blue T-shirt',
      'category': 'clothing',
      'type': 'tshirt',
      'rating': '2',
      'price': '299',
      'availability': '0',
    };
    expect(app.showProductDetails()).toEqual(undefined);
  });
  it('should return nothing', () => {

    const app = fixture.debugElement.componentInstance;
    app.editedPid = '5adeb6ee914aa915e29149f7';
    app.editedproductName = 'Blue T-shirt';
  app.editedproductType = 'tshirt',
   app.editedproductCategory = 'Clothing';
   app.editedproductRating = '2';
   app.editedproductPrice = '299';
    app.editedproductAvailability = '0';
    expect(app.updateProduct()).toEqual(undefined);
  });
  it('should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    app.editedPid = '5adeb6ee914aa915e29149f7';
    app.getProduct(app.editedPid);
    expect(app.restDetails()).toEqual(undefined);
  });
  it('should set edited product type', () => {
    const app = fixture.debugElement.componentInstance;
    // app.editedPid = '5adeb6ee914aa915e29149f7';
    // app.getProduct(app.editedPid);
    const data = 'lower';
    app.changeType(data);
    app.editedproductType = 'lower';
    expect(app.editedproductType).toEqual(data);
  });
  it('should set edited product category', () => {
    const app = fixture.debugElement.componentInstance;
    // app.editedPid = '5adeb6ee914aa915e29149f7';
    // app.getProduct(app.editedPid);
    const data = 'Clothing';
    app.changeCategory(data);
    app.editedproductCategory = 'Clothing';
    expect(app.editedproductCategory).toEqual(data);
  });
});
