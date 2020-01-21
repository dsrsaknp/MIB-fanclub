import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HomeService } from './../../../shared-services/home.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGalleryComponent } from './home-gallery.component';

describe('HomeGalleryComponent', () => {
  let component: HomeGalleryComponent;
  let fixture: ComponentFixture<HomeGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGalleryComponent ],
      providers: [HomeService, HttpClient, HttpHandler, HandleApiErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
