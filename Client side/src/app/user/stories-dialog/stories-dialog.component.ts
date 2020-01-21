import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModule } from '../user.module';

@Component({
  selector: 'app-stories-dialog',
  templateUrl: './stories-dialog.component.html',
  styleUrls: ['./stories-dialog.component.css']
})
export class StoriesDialogComponent implements OnInit {
  constructor(public thisDialogRef: MatDialogRef<StoriesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
