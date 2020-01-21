import { MaterialModule } from './../../../material.module';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingnewsCarouselComponent } from './breakingnews-carousel.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeService } from '../../../shared-services/home.service';

describe('BreakingnewsCarouselComponent', () => {
  let component: BreakingnewsCarouselComponent;
  let fixture: ComponentFixture<BreakingnewsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakingnewsCarouselComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
      providers: [HomeService, HttpClient, HttpHandler, HandleApiErrorService],
      imports: [ MaterialModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingnewsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



