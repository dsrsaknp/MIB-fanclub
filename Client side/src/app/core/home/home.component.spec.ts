import { AppRoutingModule } from './../../app-routing.module';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { RecentVideosComponent } from './recent-videos/recent-videos.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';
import { BreakingnewsCarouselComponent } from './breakingnews-carousel/breakingnews-carousel.component';
import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeService } from '../../shared-services/home.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HandleApiErrorService } from '../../handle-api-error.service';
import { FixturesComponent } from './fixtures/fixtures.component';
import { HomePlayersComponent } from './home-players/home-players.component';
import { Router } from '@angular/router';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
      providers: [HomeService, HttpClient, HttpHandler, HandleApiErrorService, {provide: Router, useClass: AppRoutingModule}
      ],
      imports: [ MaterialModule, HttpClientModule],
      declarations: [ HomeComponent,
      BreakingnewsCarouselComponent,
    FixturesComponent,
  CarouselCardComponent,
  RecentVideosComponent,
  HomeGalleryComponent,
  HomePlayersComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
