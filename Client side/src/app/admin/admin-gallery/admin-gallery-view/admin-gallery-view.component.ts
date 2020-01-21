import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';

@Component({
  selector: 'app-admin-gallery-view',
  templateUrl: './admin-gallery-view.component.html',
  styleUrls: ['./admin-gallery-view.component.css']
})
export class AdminGalleryViewComponent implements OnInit {

  public caption;
  public details;
  public image;
  public data1;
  // tslint:disable-next-line:max-line-length
  constructor(private api: ApiService, public thisDialogRef: MatDialogRef<AdminGalleryViewComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data1 = this.data;
    this.caption = this.data1.caption;
    this.details = this.data1.details;
    this.image = this.data1.image;
    // console.log(this.data1.title);
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

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



}







