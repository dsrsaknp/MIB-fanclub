import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-news-update',
  templateUrl: './admin-news-update.component.html',
  styleUrls: ['./admin-news-update.component.css'],

})
export class AdminNewsUpdateComponent implements OnInit {
  public title;
  public body;
  public image;
  public data1;
  form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private toaster: ToastsManager, private api: ApiService, public thisDialogRef: MatDialogRef<AdminNewsUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data1 = this.data;
    this.title = this.data1.title;
    this.body = this.data1.body;
    this.image = this.data1.image;
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required, Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]),

    });
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  onCloseYes1() {
    this.thisDialogRef.close('yes1');
  }
  updateNews(check) {
    if (this.title.length > 100) {
      this.toaster.warning('title cannot be more than 100 letters');
      return false;
    }
    if (this.body.length > 1000) {
      this.toaster.warning('body cannot be more than 1000 letters');
      return false;
    }
    if (this.title.trim() === '' || this.body.trim() === '') {
      this.toaster.warning('title or body does not have content');   // Not logged in
      return false;
    }
    const obj = { 'title': this.title, 'body': this.body, 'image': this.image, 'check': check};
    const myJSON = JSON.stringify(obj);
    this.api.updateNews1(myJSON).subscribe(data => {
      if (data === true) {
        this.toaster.warning('successfully updated');   // Not logged in
      }
    });
    return false;
  }

}

