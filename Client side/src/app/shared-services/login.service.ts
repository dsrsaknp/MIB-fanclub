import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggedInUser } from '../core/user';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwtToken')
    })
  };

  public server_url = environment.serverUrl;
  public isLoggedIn = false;
  private userImg = '../../assets/icons/ic_account_circle_white_48px.svg';
  private userData: any = [];
  public notifyLogin: EventEmitter<any> = new EventEmitter();
  public notifyLogout: EventEmitter<any> = new EventEmitter();
  isAdmin = false;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('isAdmin') === 'true') {
      this.isAdmin = true;
      this.notifyLogin.emit(true);
    }
  }



  setUserData(data) {
    this.userData = data;
    //  console.log(this.userData);
  }
  forgotPass(email) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post(this.server_url + '/forgotPass',  email, httpOptions);
  }
  getUserData(userEmail) {
    //  console.log(userEmail);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
      })
    };
    return this.http.get(this.server_url + '/getUserData/' + userEmail, httpOptions);
  }
  getCreditScore(userEmail) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('jwtToken')
      })
    };
    return this.http.get(this.server_url + '/getCreditScore/' + userEmail, httpOptions);
  }
  adalLogin(data) {
    return this.http.post(this.server_url + '/adalLogin', data);
  }
}
