import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesComponent } from './fixtures.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeService } from '../../../shared-services/home.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HandleApiErrorService } from '../../../handle-api-error.service';

describe('FixturesComponent', () => {
  let component: FixturesComponent;
  let fixture: ComponentFixture<FixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
      providers: [HomeService, HttpClient, HttpHandler, HandleApiErrorService],
      imports: [ MaterialModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
