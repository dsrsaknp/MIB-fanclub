import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModule } from './../user.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowDialogComponent } from './slideshow-dialog.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

describe('SlideshowDialogComponent', () => {
  let component: SlideshowDialogComponent;
  let fixture: ComponentFixture<SlideshowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      declarations: [ SlideshowDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
