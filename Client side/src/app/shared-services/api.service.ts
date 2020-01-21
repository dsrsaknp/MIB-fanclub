import { environment } from './../../environments/environment';

import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from 'protractor';
import { Http, HttpModule, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' },
  )
};

@Injectable()
export class ApiService {

  private pid;

  // tslint:disable-next-line:max-line-length
  private news_url = 'http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIndia_national_cricket_team%22%5D%7D%7D%2C%7B%22categoryUri%22%3A%7B%22%24and%22%3A%5B%22dmoz%2FSports%2FCricket%2FNews_and_Media%22%5D%7D%7D%2C%7B%22%24or%22%3A%5B%7B%22sourceUri%22%3A%22timesofindia.indiatimes.com%22%7D%5D%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=date&articlesCount=20&articlesIncludeArticleBasicInfo=false&articlesIncludeArticleEventUri=false&articlesIncludeArticleImage=true&articlesArticleBodyLen=-1&articlesIncludeConceptLabel=false&articlesIncludeConceptDescription=true&apiKey=7d25e13f-e06d-4f1a-9b2e-c57ee1180361';
  // public player_url = 'http://cricapi.com/api/playerStats/?pid=';

  public server_url = environment.serverUrl;
  player_url = this.server_url + '/player/';

  public apikey = '2a5NqdO0NldQu5laMoXhK5Sp6nn2';


  constructor(private http: HttpClient) { }

  loadPlayer(pid) {
    this.pid = pid;
    return this.http.get(this.player_url + pid);
  }

  loadAllPlayers() {
    return this.http.get(this.server_url + '/allPlayers');
  }

  getPid() {
    return this.pid;
  }

  login(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.server_url + '/login', user, httpOptions);
  }
  register(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post(this.server_url + '/verify', user, httpOptions);
  }
  verifyEmail(userEmail) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post(this.server_url + '/send', userEmail, httpOptions);
  }
  updateUser(email, Details) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    const body = JSON.stringify(Details);
    return this.http.put(this.server_url + '/update/' + email, body, httpOptions);
  }

  getMatches() {
    return this.http.get(this.server_url + '/calendar');
  }
  getMatches1() {
    return this.http.get(this.server_url + '/pastMatches');
  }

  userSlide() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.http.get( this.server_url + '/userslide', httpOptions);

  }
  userVideo() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.http.get( this.server_url + '/uservideo', httpOptions);

  }
  MibNews() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get( this.server_url + '/getNews', httpOptions);
  }
  getNews() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get( this.server_url + '/getAdminNews', httpOptions);
  }
  addNews1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/addAdminNews', user, httpOptions);
  }
  deleteNews1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')

      })
    };
    return this.http.post(this.server_url + '/deleteAdminNews', user, httpOptions);
  }
  updateNews1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    console.log(user);
    return this.http.post(this.server_url + '/updateAdminNews', user, httpOptions);
  }
  getSlide() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get( this.server_url + '/getAdminSlide', httpOptions);
  }
  addSlide1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/addAdminSlide', user, httpOptions);
  }
  deleteSlide1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/deleteAdminSlide', user, httpOptions);
  }
  updateSlide1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    // console.log(user);
    return this.http.post(this.server_url + '/updateAdminSlide', user, httpOptions);
  }
  getVideo() {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // tslint:disable-next-line:max-line-length
    return this.http.get( this.server_url + '/getAdminVideo', httpOptions);
  }
  addVideo1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/addAdminVideo', user, httpOptions);
  }
  deleteVideo1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/deleteAdminVideo', user, httpOptions);
  }
  updateVideo1(user) {
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.post(this.server_url + '/updateAdminVideo', user, httpOptions);
  }
}
