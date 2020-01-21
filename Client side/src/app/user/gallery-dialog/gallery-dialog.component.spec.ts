import { YoutubePlayerModule } from 'ngx-youtube-player';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDialogComponent } from './gallery-dialog.component';
import { UserModule } from '../user.module';

describe('GalleryDialogComponent', () => {
  let component: GalleryDialogComponent;
  let fixture: ComponentFixture<GalleryDialogComponent>;
  // tslint:disable-next-line:prefer-const
  let thisDialogRef: MatDialogRef<GalleryDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ YoutubePlayerModule],
      declarations: [ GalleryDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
         {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //   fit('onCloseCancel', () => {
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.onCloseCancel()).toEqual(undefined);
  // });
});
