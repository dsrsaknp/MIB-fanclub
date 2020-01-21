
import { SlideshowDialogComponent } from './../slideshow-dialog/slideshow-dialog.component';
import { GalleryDialogComponent } from './../gallery-dialog/gallery-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from './../../shared-services/api.service';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { element } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public image;
  public imageLength;
  public image1;
  public imgname;
  public imgdetail;
  public video;
  public videoLength;
  public video1;
  public video2;
  public start = 0;
  public end = 2;
  public end1 = 2;
  public check = false;
  public disp;
  public isLoggedIn;
  public showModalToLogin = false;
  inProgress = true;
  player: YT.Player;
  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
  }
  constructor(private toaster: ToastsManager, public dialog: MatDialog, private api: ApiService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Gallery');
    this.api.userSlide()
      .subscribe(data => {
        if (data) {
          this.inProgress = false;
          this.image = data;
          this.imageLength = this.image.length;
          this.image1 = this.image.slice(0, 3);
        } else {
          this.inProgress = true;
        }
      });
    this.api.userVideo()
      .subscribe(data => {
        this.video = data;
        this.videoLength = this.video.length;
        this.video2 = data;
        this.video1 = this.video.slice(0, 3);
      });
      if (localStorage.getItem('userName')) {
        this.isLoggedIn = true;
    }
  }

  openDialog1(n) {
    const dialogRef = this.dialog.open(SlideshowDialogComponent, {
      width: '90%',
      height: 'auto',
      data: { title: n }
    });
  }
  openDialog(n) {
    const dialogRef = this.dialog.open(GalleryDialogComponent, {
      width: '80%',
      height: '80%',
      data: { title: n }
    });
  }

  loadMore() {
    if (!this.isLoggedIn) {
      this.toaster.warning('Please login to view!', 'Oops!');   // Not logged in
    } else {
      if (this.end > (this.videoLength )) {
        this.toaster.warning('No more videos');
      }
      this.start = this.start + 3;
      this.end = this.end + 3;
      this.video1 = this.video.slice(0, this.end + 1);
    }
  }
  loadLess() {
      if ( this.end > 2) {
        this.end = this.end - 3;
        this.video1 = this.video.slice(0, this.end + 1);
    } else {
      this.toaster.warning('View More first');
    }
  }
  loadMore1() {
    if (!this.isLoggedIn) {
      this.toaster.warning('Please login to view!', 'Oops!'); // Not logged in
    } else {
      if (this.end1 > (this.imageLength )) {
        this.toaster.warning('No more images');
      }
      this.end1 = this.end1 + 3;
      this.image1 = this.image.slice(0, this.end1 + 1);
    }
  }
  loadLess1() {
    if ( this.end1 > 2) {
      this.end1 = this.end1 - 3;
      this.image1 = this.image.slice(0, this.end1 + 1);
  } else {
    this.toaster.warning('View More first');
  }
}
  openNav(img, details) {
    this.imgname = img;
    this.imgdetail = details;
    this.disp = 'block';
  }
  closeNav() {
    this.disp = 'none';
  }
}
