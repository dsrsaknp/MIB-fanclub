import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-videos-update',
  templateUrl: './admin-videos-update.component.html',
  styleUrls: ['./admin-videos-update.component.css']
})
export class AdminVideosUpdateComponent implements OnInit {

  public title;
  public data1;
  // tslint:disable-next-line:max-line-length
  constructor(private toaster: ToastsManager, private api: ApiService, public thisDialogRef: MatDialogRef<AdminVideosUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data1 = this.data;
    this.title = this.data1.title;
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  onCloseYes1() {
    this.thisDialogRef.close('yes1');
  }
  updateVideos(check) {
    console.log(this.title);
    if (this.title === undefined ) {
      this.toaster.warning('id does not have content');   // Not logged in
      return false;
    }
    if (this.title.trim() === '' ) {
      this.toaster.warning('id does not have content');   // Not logged in
      return false;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            const match = this.title.match(regExp);
            if (!(match && match[2].length === 11)) {
                this.toaster.warning('should be valid youtube url');
                return false;
            }
this.title = this.title.substring(this.title.length - 11);
    const obj = { 'title': this.title, 'check': check};
    const myJSON = JSON.stringify(obj);
    this.api.updateVideo1(myJSON).subscribe(data => {
      if (data === true) {
        this.toaster.warning('successfully updated');
      }
    });
    return false;
  }


}




