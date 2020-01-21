import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { UserModule } from '../user.module';

@Component({
  selector: 'app-admin-videos-view',
  templateUrl: './admin-videos-view.component.html',
  styleUrls: ['./admin-videos-view.component.css']
})
export class AdminVideosViewComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef< AdminVideosViewComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}




