import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModule } from './../user.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesDialogComponent } from './stories-dialog.component';
import { MaterialModule } from '../../material.module';

describe('StoriesDialogComponent', () => {
  let component: StoriesDialogComponent;
  let fixture: ComponentFixture<StoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ StoriesDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
