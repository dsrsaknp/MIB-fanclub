import { StoriesDialogComponent } from './../stories-dialog/stories-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from './../../shared-services/api.service';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  dialogResult = '';
  constructor(private toaster: ToastsManager, public dialog: MatDialog, private api: ApiService, private titleService: Title) { }
  news: any = [];
  num = 3;
  inProgress = true;
  isLoggedIn = false;
  count = 0;
  check = 0;
  ngOnInit() {
    this.titleService.setTitle('Stories');
    this.api.MibNews()
      .subscribe(data => {
        if (data) {
        this.news = data;
        this.inProgress = false;
        } else {
          this.inProgress = true;
        }
      });
      if (localStorage.getItem('userName')) {
        this.isLoggedIn = true;
    }
  }

  openDialog(news_title, news_image, news_body) {
    const dialogRef = this.dialog.open(StoriesDialogComponent, {
      width: '800px',
      height: 'auto',
      data: { title: news_title, image: news_image, details: news_body }
    });

  }
  notLog() {
    this.toaster.warning('Please login to view!', 'Oops!');
  }


}
