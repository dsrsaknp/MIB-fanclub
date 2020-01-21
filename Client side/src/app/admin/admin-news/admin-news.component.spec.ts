import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-spacing
import { FormsModule }   from '@angular/forms';
import { AdminNewsComponent } from './admin-news.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ApiService } from '../../shared-services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminRoutingModule } from '../admin-routing.module';
import { MatDialog } from '@angular/material';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {MatDialogModule} from '@angular/material';
import * as newsData from '../../../assets/NewsDummyData.json';
import { AdminNewsViewComponent } from './admin-news-view/admin-news-view.component';


describe('AdminNewsComponent', () => {
  let component: AdminNewsComponent;
  let fixture: ComponentFixture<AdminNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [ AdminNewsComponent, AdminNewsViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ApiService, HttpClient, HttpHandler, { provide: Router, useClass: AdminRoutingModule } ,
        { provide: MatDialog, useClass : AdminNewsViewComponent} ,
         MatDialog, OVERLAY_PROVIDERS, ScrollStrategyOptions, ScrollDispatcher, Platform],
    })
    .compileComponents();
}));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.currentNews()).toEqual(undefined);
  });
  it('should get all news', () => {
    const app = fixture.debugElement.componentInstance;
    app.currentNews();
    app.tables = {
      '_id' : 'a',
      'title' : 'b',
      'body' : 'c',
      'image' : 'd'
  };
    expect(app.tables).toEqual(newsData);
  });
  it(' add  news should return false', () => {
    const app = fixture.debugElement.componentInstance;
    // const data = newsData;
    expect(app.addNews()).toEqual(false);
  });
  it('should view  news', () => {
    const app = fixture.debugElement.componentInstance;
    // const data = newsData;
    expect(app.ViewNews('b', 'c', 'd' )).toEqual(undefined);
  });
  it('delete  news should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    // const data = newsData;
    expect(app.deleteNews ('b')).toEqual(undefined);
  });
  it('update  news should return nothing', () => {
    const app = fixture.debugElement.componentInstance;
    // const data = newsData;
    expect(app. updateNews('b', 'c', 'd')).toEqual(undefined);
  });
});
