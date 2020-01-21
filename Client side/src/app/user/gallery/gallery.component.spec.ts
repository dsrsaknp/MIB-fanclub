import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './../user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../shared-services/api.service';
import { SlideshowDialogComponent } from './../slideshow-dialog/slideshow-dialog.component';
import { GalleryDialogComponent } from './../gallery-dialog/gallery-dialog.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import {  YoutubePlayerModule } from 'ngx-youtube-player';
// import {  } from '@angular/compiler/src/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserModule } from '../user.module';
// import { }



describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, HttpClientModule, YoutubePlayerModule, BrowserAnimationsModule, MatDialogModule
      ],
      declarations: [ GalleryComponent,
        GalleryDialogComponent,
        SlideshowDialogComponent,
       ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
       providers: [
        {provide: Router, useClass: UserRoutingModule},
         ApiService
       ],
      // entryComponents: [
      //   GalleryDialogComponent
      // ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // fit('openDialog', () => {
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.openDialog('n')).toEqual(undefined);
  // });
    it('savePlayer', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.savePlayer()).toEqual(undefined);
  });
  it('onStateChange', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.onStateChange()).toEqual(undefined);
  });
});
