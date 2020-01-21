import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  private serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get(this.serverUrl + '/home/getAllPlayers');
  }
  getImages() {
    return this.http.get(this.serverUrl + '/home/getImages');
  }
  getNews() {
    return this.http.get(this.serverUrl + '/home/getNews');
  }
  getRecentMatches() {
    return this.http.get(this.serverUrl + '/home/getRecentMatches');
  }
  getCalender() {
    return this.http.get(this.serverUrl + '/home/getCalender');
  }
  getVideos() {
    return this.http.get(this.serverUrl + '/home/getVideos');
  }
}
