import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-gallery-update',
  templateUrl: './admin-gallery-update.component.html',
  styleUrls: ['./admin-gallery-update.component.css']
})
export class AdminGalleryUpdateComponent implements OnInit {

  public caption;
  public details;
  public image;
  public data1;
  inProgress = false;
  form: FormGroup;
  flag = 0;
  public imageFile;
  // tslint:disable-next-line:max-line-length
  constructor(private toaster: ToastsManager, private api: ApiService, public thisDialogRef: MatDialogRef<AdminGalleryUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data1 = this.data;
    this.caption = this.data1.caption;
    this.details = this.data1.details;
    this.image = this.data1.image;
    this.form = new FormGroup({
      caption: new FormControl('', [Validators.required]),
        details: new FormControl('', [Validators.required])
        // ^(?!\s)([a-zA-Z0-9 _.'"()!?&@]){1,}$
    });
  }
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    this.imageFile = file;

  if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   const binaryString = readerEvt.target.result;
          this.image = 'data:image/jpeg;base64,' + btoa(binaryString);
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  onCloseYes2() {
    this.thisDialogRef.close('yes2');
  }
  updateSlide(check) {
    if (this.caption.length > 100) {
      this.toaster.warning('caption cannot be more than 100 letters');
      return false;
    }
    if (this.details.length > 1000) {
      this.toaster.warning('details cannot be more than 1000 letters');
      return false;
    }
    if (this.caption.trim() === '' || this.details.trim() === '') {
      this.toaster.warning('caption or details does not have content');   // Not logged in
      return false;
    }
// tslint:disable-next-line:max-line-length
if (!((this.imageFile.name.substring(this.imageFile.name.length - 4).toLowerCase() === '.png') ||
 (this.imageFile.name.substring(this.imageFile.name.length - 4).toLowerCase() === '.jpg'))) {
  this.toaster.warning('only png or jpg files are excepted');
  return false;
}
    this.inProgress = true;
    const obj = { 'caption': this.caption, 'details': this.details, 'image': this.image, 'check': check};
    const myJSON = JSON.stringify(obj);
    this.api.updateSlide1(myJSON).subscribe(data => {
      if (data === true) {
        this.toaster.warning('successfully updated');   // Not logged in
        this.onCloseYes2();
      }
    });
    return false;
  }


}







