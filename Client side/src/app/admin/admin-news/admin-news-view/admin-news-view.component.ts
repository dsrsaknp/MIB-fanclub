import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';

@Component({
  selector: 'app-admin-news-view',
  templateUrl: './admin-news-view.component.html',
  styleUrls: ['./admin-news-view.component.css']
})
export class AdminNewsViewComponent implements OnInit {

  public title;
  public body;
  public image;
  public data1;
  // tslint:disable-next-line:max-line-length
  constructor(private api: ApiService, public thisDialogRef: MatDialogRef<AdminNewsViewComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.data1 = this.data;
    this.title = this.data1.title;
    this.body = this.data1.body;
    this.image = this.data1.image;
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}




