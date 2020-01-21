
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared-services/api.service';
import { Router } from '@angular/router';
import { AdminNewsUpdateComponent } from '../admin-news/admin-news-update/admin-news-update.component';
import { MatDialog } from '@angular/material';
import { AdminGalleryViewComponent } from './admin-gallery-view/admin-gallery-view.component';
import { AdminGalleryDeleteComponent } from './admin-gallery-delete/admin-gallery-delete.component';
import { AdminGalleryUpdateComponent } from './admin-gallery-update/admin-gallery-update.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {
  public tables;
  public caption;
  public details;
  public image;
  public dialogResult;
  public dialogResult1;
  inProgress = true;
  form: FormGroup;
  flag = 0;
  public imageFile;
  constructor(private toaster: ToastsManager, private api: ApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.api.getSlide()
      .subscribe(data => {
        if (data) {
          this.inProgress = false;
          this.tables = data;
        }
      }, (error) => {
        console.log(error);
      });
    this.form = new FormGroup({
      caption: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required])
    });
  }
  // , Validators.pattern('^(?! )[A-Za-z0-9\'\-,\. ]*(?<! )$')
  currentSlide() {
    this.api.getSlide()
      .subscribe(data => {
        if (data) {
          this.inProgress = false;
          this.tables = data;
        }
      }, (error) => {
        console.log(error);
      });
  }

  handleFileSelect(evt) {
    console.log(evt.target.files);

    if (evt.target.files.length === 0) {
      this.imageFile = '';
      return;
    }
    console.log(evt);
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      this.imageFile = file;
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.image = 'data:image/jpeg;base64,' + btoa(binaryString);
  }
  addSlide() {
    console.log(this.imageFile);
    if (this.caption.length > 100) {
      this.toaster.warning('caption cannot be more than 100 letters');
      return false;
    }
    if (this.details.length > 1000) {
      this.toaster.warning('details cannot be more than 1000 letters');
      return false;
    }
    if (this.imageFile === '' || this.imageFile === undefined) {
      this.toaster.warning('Please add a image');
      return false;
    }
    if (this.caption.trim() === '' || this.details.trim() === '') {
      this.toaster.warning('caption or details does not have content');   // Not logged in
      this.imageFile = '';
      return false;
    }

    // tslint:disable-next-line:max-line-length
    if (!((this.imageFile.name.substring(this.imageFile.name.length - 4).toLowerCase() === '.png') ||
      (this.imageFile.name.substring(this.imageFile.name.length - 4).toLowerCase() === '.jpg'))) {
      this.toaster.warning('only png or jpg files are excepted');
      this.imageFile = '';
      return false;
    }
    this.inProgress = true;
    const obj = { 'image': this.image, 'caption': this.caption, 'details': this.details };
    const myJSON = JSON.stringify(obj);
    this.api.addSlide1(myJSON).subscribe(data => {
      if (data === true) {
        this.inProgress = true;
        this.toaster.warning('successfully added');   // Not logged in
        this.api.getSlide()
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data => {
            if (data) {
              this.inProgress = false;
              this.tables = data;
            }
          }, (error) => {
            console.log(error);
          });
      }
    }, (error) => {
      console.log(error);
    });
    return false;
  }
  viewSlide(image, caption, details) {
    const dialogRef = this.dialog.open(AdminGalleryViewComponent, {
      width: '90%',
      height: 'auto',
      data: { image: image, caption: caption, details: details }
    });
  }
  deleteSlide(e) {
    const dialogRef = this.dialog.open(AdminGalleryDeleteComponent, {
      width: '90%',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      if (this.dialogResult === 'yes') {
        const obj = { 'title': e };
        const myJSON = JSON.stringify(obj);
        this.api.deleteSlide1(myJSON).subscribe(data => {
          const myJSON1 = JSON.stringify(data);
          if (data === true) {
            console.log('deleted');
            this.inProgress = true;
            this.currentSlide();
            this.toaster.warning('successfully deleted');   // Not logged in
          }
        }, (error) => {
          console.log(error);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }
  updateSlide(image, caption, details) {
    const dialogRef = this.dialog.open(AdminGalleryUpdateComponent, {
      width: '90%',
      height: 'auto',
      data: { image: image, caption: caption, details: details }
    });
    this.inProgress = true;
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult1 = result;
      if (this.dialogResult1 === 'yes2') {
        this.inProgress = true;
        this.api.getSlide()
          .subscribe(data => {
            if (data) {
              this.tables = data;
              this.inProgress = false;
            }
          }, (error) => {
            console.log(error);
          });
      }
    }, (error) => {
      console.log(error);
    });
  }
}









