import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../shared-services/api.service';

@Component({
  selector: 'app-admin-news-delete',
  templateUrl: './admin-news-delete.component.html',
  styleUrls: ['./admin-news-delete.component.css']
})
export class AdminNewsDeleteComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private api: ApiService, public thisDialogRef: MatDialogRef<AdminNewsDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }


  ngOnInit() {
  }
  onCloseYes() {
    this.thisDialogRef.close('yes');
  }
  onCloseNo() {
    this.thisDialogRef.close('no');
  }
}
