import { AdalService } from 'ng2-adal/dist/core';
import { HandleApiErrorService } from './../../handle-api-error.service';
import { HomeService } from './../../shared-services/home.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from '../../shared-services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData;

  // Dummy Data ...
  public recentMatches = [];

  // tslint:disable-next-line:max-line-length
  // public testImg = 'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/03/18/Pictures/ap3-18-2018-000231b_8d4168f8-2ad4-11e8-933f-cd1ae5bb99b3.jpg';
  constructor(private homeService: HomeService, private apiErrorService: HandleApiErrorService,
    private titleService: Title, private adalService: AdalService, private loginService: LoginService) { }

  ngOnInit() {


    if (sessionStorage.getItem('adal')) {

      this.loginService.adalLogin(this.adalService.userInfo).subscribe(data => {
        if (data) {
          this.userData = data;
          this.loadUser();
          if (this.userData.data.isAdmin) {
            this.loginService.isAdmin = true;
            this.loginService.notifyLogin.emit(true);
          } else {
            this.loginService.notifyLogin.emit(false);
          }          sessionStorage.removeItem('adal');
          // window.location.reload();
        }
      });
    }

    this.titleService.setTitle('MiB Fanclub');
    this.homeService.getRecentMatches().subscribe(data => {
      this.setCalData(data);
    },
      error => {
        this.apiErrorService.apiError.emit(error);
      }
    );
  }
  setCalData(data) {
    this.recentMatches = data;
  }

  loadUser() {
        localStorage.setItem('userName', this.userData.data.firstname);
    localStorage.setItem('userEmail', this.userData.data.email);
    localStorage.setItem('isAdmin', this.userData.data.isAdmin);
    localStorage.setItem('jwtToken', this.userData.token);
    this.loginService.setUserData(this.userData);
  }

}
