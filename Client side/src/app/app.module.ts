import { SecretService } from './shared-services/adal/secret.service';
import { AdalService } from 'ng2-adal/dist/core';
import { AuthGaurdService } from './shared-services/auth-gaurd.service';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ApiService } from './shared-services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
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
import { HandleApiErrorService } from './handle-api-error.service';
import { RecentVideoDialogComponent } from './core/home/recent-video-dialog/recent-video-dialog.component';
import { StoreService } from './shared-services/store.service';
import { CreditComponent } from './core/account/credit/credit.component';
import { AuthAdminService } from './shared-services/auth-admin.service';


@NgModule({
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
    CreditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    CalendarModule,
    ToastModule.forRoot()
  ],
  providers: [ApiService, LoginService, HomeService, HandleApiErrorService,
    StoreService, AuthGaurdService, AuthAdminService, AdalService, SecretService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, RecentVideoDialogComponent],
  exports: [MaterialModule]
})
export class AppModule { }
