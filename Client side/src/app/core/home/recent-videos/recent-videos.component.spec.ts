import { HomeService } from './../../../shared-services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../../../material.module';
import { HomeComponent } from './../home.component';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVideosComponent } from './recent-videos.component';

describe('RecentVideosComponent', () => {
  let component: RecentVideosComponent;
  let fixture: ComponentFixture<RecentVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
      declarations: [ RecentVideosComponent ],
      providers: [
        HandleApiErrorService,
        HomeComponent,
        HomeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
