import { AppRoutingModule } from './../../../app-routing.module';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlayersComponent } from './home-players.component';
import { HomeService } from '../../../shared-services/home.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HandleApiErrorService } from '../../../handle-api-error.service';
import { Router } from '@angular/router';



describe('HomePlayersComponent', () => {
  let component: HomePlayersComponent;
  let fixture: ComponentFixture<HomePlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],

      declarations: [ HomePlayersComponent ],
      providers: [HomeService, HttpClient, HttpHandler, HandleApiErrorService, {provide: Router, useClass: AppRoutingModule} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
