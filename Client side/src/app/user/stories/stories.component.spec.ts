import { UserRoutingModule } from './../user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../shared-services/api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComponent } from './stories.component';
import { MaterialModule } from '../../material.module';
import { StoriesDialogComponent } from '../stories-dialog/stories-dialog.component';
import { Router } from '@angular/router';




describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
      declarations: [ StoriesComponent, StoriesDialogComponent ],
      providers: [
        {provide: Router, useClass: UserRoutingModule},
        ApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
