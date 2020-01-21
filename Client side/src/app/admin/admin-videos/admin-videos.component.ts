import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared-services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AdminVideosViewComponent } from './admin-videos-view/admin-videos-view.component';
import { AdminVideosDeleteComponent } from './admin-videos-delete/admin-videos-delete.component';
import { AdminVideosUpdateComponent } from './admin-videos-update/admin-videos-update.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css']
})
export class AdminVideosComponent implements OnInit {

  public tables;
  public title;
  public dialogResult;
  public dialogResult1;
  inProgress = true;
  player: YT.Player;
  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
  }
  constructor(private toaster: ToastsManager, private api: ApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.api.getVideo()
    .subscribe(data => {
      if (data) {
        this.inProgress = false;
        this.tables = data;
      }
    });
  }


  currentVideos() {
    this.api.getVideo()
    .subscribe(data => {
      if (data) {
        this.inProgress = false;
        this.tables = data;
      }
    });
  }
  addVideos() {
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
    const obj = { 'title': this.title};
    const myJSON = JSON.stringify(obj);
    this.api.addVideo1(myJSON).subscribe(data => {
      if (data === true) {
        this.inProgress = false;
        this.toaster.warning('successfully added');
        this.currentVideos();
      }
    });
    return false;
  }
  viewVideos(n) {
    const dialogRef = this.dialog.open(AdminVideosViewComponent, {
      width: '80%',
      height: '80%',
      data: { title: n }
    });
  }
  deleteVideos(e) {
    const dialogRef = this.dialog.open(AdminVideosDeleteComponent, {
      width: '90%',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      if ( this.dialogResult === 'yes') {
        const obj = { 'title': e};
        const myJSON = JSON.stringify(obj);
        this.api.deleteVideo1(myJSON).subscribe(data => {
          const myJSON1 = JSON.stringify(data);
          if (data === true) {
            this.inProgress = false;
            this.currentVideos();
            this.toaster.warning('successfully deleted');
          }
        }, (error) => {
          console.log(error);
          });
      }
    });
  }
  updateVideos(title) {
    const dialogRef = this.dialog.open(AdminVideosUpdateComponent, {
      width: '90%',
      height: 'auto',
      data: { title: title }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult1 = result;
      if ( this.dialogResult1 === 'yes1') {
        this.inProgress = false;
        this.currentVideos();
      }
    }, (error) => {
      console.log(error);
      });
  }
}







