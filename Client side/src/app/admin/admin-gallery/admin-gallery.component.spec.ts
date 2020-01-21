import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryComponent } from './admin-gallery.component';
import * as galleryData from '../../../assets/GalleryDummyData.json';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../shared-services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminRoutingModule } from '../admin-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminGalleryComponent', () => {
  let component: AdminGalleryComponent;
  let fixture: ComponentFixture<AdminGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [ AdminGalleryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ApiService, HttpClient, HttpHandler, { provide: Router, useClass: AdminRoutingModule },
        MatDialog, OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher, Platform]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.currentSlide()).toEqual(undefined);
  });
  fit('should get all images', () => {
    const app = fixture.debugElement.componentInstance;
    app.currentSlide();
    app.tables = {
      '_id' : 'a',
      'caption' : 'b',
      'details' : 'c',
      'image' : 'd'
  };
    expect(app.tables).toEqual(galleryData);
  });
  it(' add  gallery should return false', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.addSlide()).toEqual(false);
  });
  it('should view  gallery', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.ViewSlide('b', 'c', 'd' )).toEqual(undefined);
  });
  it('delete  images should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.deleteSlide ('b')).toEqual(undefined);
  });
  it('update  images should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app. updateSlide('b', 'c', 'd')).toEqual(undefined);
  });
});
