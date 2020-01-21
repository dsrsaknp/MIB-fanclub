import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModule } from '../user.module';

@Component({
  selector: 'app-slideshow-dialog',
  templateUrl: './slideshow-dialog.component.html',
  styleUrls: ['./slideshow-dialog.component.css']
})
export class SlideshowDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SlideshowDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}





