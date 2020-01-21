import { AppRoutingModule } from './../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../shared-services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';





describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],

      declarations: [ RegisterComponent ],
      providers: [
         {provide: Router, useClass: AppRoutingModule},
         {provide: FormGroup, useValue: {}},
         {provide: MatDialogRef, useValue: {}},
         {provide: MAT_DIALOG_DATA, useValue: {}},
          ApiService,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should verify', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.verifyEmail()).toEqual(undefined);
});
});
