import { AppRoutingModule } from './../../app-routing.module';
import { ApiService } from './../../shared-services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './../../shared-services/login.service';
import { MaterialModule } from './../../material.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule,
        FormsModule, HttpClientModule
      ],
      declarations: [AccountComponent],
      providers: [{ provide: FormGroup, useValue: '' }, LoginService, ApiService],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
