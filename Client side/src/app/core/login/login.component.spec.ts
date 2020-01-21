import { AppRoutingModule } from './../../app-routing.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginService } from './../../shared-services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../shared-services/api.service';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './../register/register.component';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // tslint:disable-next-line:prefer-const
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
declarations: [LoginComponent],
      providers: [{ provide: Router, useClass: AppRoutingModule },
      { provide: FormGroup, useValue: {} },
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: {} },
        ApiService,
        LoginService
      ],
        })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  // tslint:disable-next-line:prefer-const
   expect(component).toBeTruthy();
  });

  it('addPost', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.addPost('post')).toEqual(undefined);
  });
});


