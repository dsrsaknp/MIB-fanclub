import { AdalService } from 'ng2-adal/dist/core';
import { ApiService } from '../../shared-services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../shared-services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  public user;
  public isLoggedIn = false;
  public isAdmin = false;
  public userImage = '../../assets/icons/ic_account_circle_white_48px.svg';
  public welcomeText = '';

  constructor(private router: Router, private dialog: MatDialog, private loginService: LoginService, private adalService: AdalService) { }

  ngOnInit() {
    if (localStorage.getItem('userName')) {
      this.isLoggedIn = true;
      // this.user = JSON.parse(localStorage.getItem('user'));
      this.welcomeText = 'Hi! ' + localStorage.getItem('userName');
    }
    if (localStorage.getItem('isAdmin') === 'true') {
      this.isAdmin = true;
    }
    this.loginService.notifyLogin.subscribe(isAdmin => {
      console.log('am I an admin ' + isAdmin);
      this.isLoggedIn = true;
      this.isAdmin = isAdmin;
      this.welcomeText = 'Hi! ' + localStorage.getItem('userName');

    });
    this.loginService.notifyLogout.subscribe(data => {
      this.isLoggedIn = false;
      this.isAdmin = false;
    });
  }

  ngAfterViewInit() {
  }

  login() {
    localStorage.clear();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    if (sessionStorage.getItem('adalLogout')) {
      sessionStorage.removeItem('adalLogout');
      this.adalService.logOut();
    }
    localStorage.clear();
    this.loginService.isAdmin = false;
    this.loginService.notifyLogout.emit(true);
    this.router.navigate(['']);
  }


}
