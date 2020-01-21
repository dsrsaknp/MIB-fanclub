import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared-services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AdminNewsDeleteComponent } from './admin-news-delete/admin-news-delete.component';
import { AdminNewsUpdateComponent } from './admin-news-update/admin-news-update.component';
import { AdminNewsViewComponent } from './admin-news-view/admin-news-view.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  public tables: any;
  public title;
  public body;
  public image;
  public id;
  public dialogResult;
  public dialogResult1;
  inProgress = true;
form: FormGroup;
  constructor(private toaster: ToastsManager, private api: ApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
   this.currentNews();
   this.form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]),
    // [^\s]+[a-zA-Z ]*[^\s]+
  });
  }


  currentNews() {
    this.api.getNews()
    .subscribe(data => {
      if (data) {
        this.inProgress = false;
        this.tables = data;
      }
    }, (error) => {
      console.log(error);
      });
  }
  addNews() {
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
    const obj = { 'title': this.title, 'body': this.body, 'image': this.image};
    const myJSON = JSON.stringify(obj);
    this.api.addNews1(myJSON).subscribe(data => {
      if (data === true) {
        console.log('added');
        this.inProgress = false;
        this.toaster.warning('successfully added');   // Not logged in
        // alert(' successfully added');
        this.currentNews();
      }
    }, (error) => {
      console.log(error);
      });
    return false;
  }
  ViewNews(title, body, image) {
    const dialogRef = this.dialog.open(AdminNewsViewComponent, {
      width: '90%',
      height: 'auto',
      data: { title: title, body: body, image: image }
    });
  }
  deleteNews(e) {
    const dialogRef = this.dialog.open(AdminNewsDeleteComponent, {
      width: '60%',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      if ( this.dialogResult === 'yes') {
        const obj = { 'title': e};
        const myJSON = JSON.stringify(obj);
        this.api.deleteNews1(myJSON).subscribe(data => {
          const myJSON1 = JSON.stringify(data);
          if (data === true) {
            console.log('deleted');
            this.inProgress = false;
            this.currentNews();
            this.toaster.warning('successfully deleted');   // Not logged in
          }
        }, (error) => {
          console.log(error);
          });
      }
    });
  }
  updateNews(title, body, image) {
    const dialogRef = this.dialog.open(AdminNewsUpdateComponent, {
      width: '90%',
      height: 'auto',
      data: { title: title, body: body, image: image }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult1 = result;
      if ( this.dialogResult1 === 'yes1') {
        this.inProgress = true;
        this.api.getNews()
        .subscribe(data => {
          if (data) {
            this.inProgress = false;
            this.tables = data;
          }
        }, (error) => {
          console.log(error);
          });
      }
    }, (error) => {
      console.log(error);
      });
  }
}

