import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVideoDialogComponent } from './recent-video-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, InjectionToken } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { HomeService } from '../../../shared-services/home.service';
import {MatDialogModule} from '@angular/material';


describe('RecentVideoDialogComponent', () => {
  let component: RecentVideoDialogComponent;
  let fixture: ComponentFixture<RecentVideoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [MaterialModule, MatDialogModule, HttpClientModule],
      declarations: [ RecentVideoDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
      // tslint:disable-next-line:max-line-length
      providers: [MatDialog, Overlay, ScrollStrategyOptions, ScrollDispatcher, Platform,
         ViewportRuler, OverlayContainer, OverlayPositionBuilder,
          OverlayKeyboardDispatcher, HomeService, {provide: MatDialogRef, useValue: {}},
          {provide: MAT_DIALOG_DATA, useValue: {}},
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
