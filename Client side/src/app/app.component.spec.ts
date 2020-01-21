import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ApiService } from './shared-services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { LoginComponent } from './core/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { LoginService } from './shared-services/login.service';
import { AccountComponent } from './core/account/account.component';
import { CarouselCardComponent } from './core/home/carousel-card/carousel-card.component';
import { BreakingnewsCarouselComponent } from './core/home/breakingnews-carousel/breakingnews-carousel.component';
import { FixturesComponent } from './core/home/fixtures/fixtures.component';
import { RecentVideosComponent } from './core/home/recent-videos/recent-videos.component';
import { HomeGalleryComponent } from './core/home/home-gallery/home-gallery.component';
import { HomePlayersComponent } from './core/home/home-players/home-players.component';
import { HomeService } from './shared-services/home.service';
import { RecentVideoDialogComponent } from './core/home/recent-video-dialog/recent-video-dialog.component';
import { StoreService } from './shared-services/store.service';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HandleApiErrorService } from './handle-api-error.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        YoutubePlayerModule ],
        declarations: [
          AppComponent,
          routingComponents,
          LoginComponent,
          HeaderComponent,
          FooterComponent,
          RegisterComponent,
          HomeComponent,
          AccountComponent,
          CarouselCardComponent,
          BreakingnewsCarouselComponent,
          FixturesComponent,
          RecentVideosComponent,
          HomeGalleryComponent,
          HomePlayersComponent,
          RecentVideoDialogComponent,
        ],
        providers: [ApiService, LoginService, HomeService, HandleApiErrorService, StoreService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
