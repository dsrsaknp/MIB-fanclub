// import { UserRoutingModule } from './../../user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { StoreService } from '../../../shared-services/store.service';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../../../user/user-routing.module';
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ProductsComponent ],
      // providers: [
      //   {provide: Router, useClass: UserRoutingModule},
      //   StoreService
      // ]
      providers: [
        {provide: Router, useClass: MockRouter},
        StoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
