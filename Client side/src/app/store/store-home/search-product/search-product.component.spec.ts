import { SearchFilterPipe } from './../../../search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductComponent } from './search-product.component';
import { MaterialModule } from '../../../material.module';
import { StoreService } from '../../../shared-services/store.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, FormsModule],
      declarations: [ SearchProductComponent, 
        SearchFilterPipe,
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        StoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
