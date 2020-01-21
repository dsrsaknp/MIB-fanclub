import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContestService {

  private serverUrl = environment.serverUrl;
  private authOption = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('jwtToken')
    })
  };
  private authOptionJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwtToken')
    })
  };

  constructor(private http: HttpClient) { }

  getLeaderBoard() {
    return this.http.get(this.serverUrl + '/getLeaderBoard');
  }
  getContests(num) {
    return this.http.get(this.serverUrl + '/getContests/' + num);
  }
  getUpcomingContests() {
    return this.http.get(this.serverUrl + '/getUpcomingContests');
  }
  postCreditScore(data) {
    return this.http.post(this.serverUrl + '/postCreditScore', data, this.authOptionJson);
  }
  // getQuestions(quizId, userEmail) {
  //   return this.http.get(this.serverUrl + '/getQuestions/' + quizId + '/' + userEmail);
  // }
  getQuestions(data) {
    return this.http.post(this.serverUrl + '/getQuestions', data, this.authOption);
  }
  sendNotification(data) {
    return this.http.post(this.serverUrl + '/sendNotifEmail', data);
  }
  postUpcomingContest(data) {
    return this.http.post(this.serverUrl + '/postUpcomingContest', data, this.authOptionJson);
  }
  checkDuplicateContest(contest) {
    return this.http.post(this.serverUrl + '/isDuplicate', contest, this.authOptionJson);
  }
  postContest(contest) {
    return this.http.post(this.serverUrl + '/postContest', contest, this.authOptionJson);
  }
  postContestQuestions(contestQuestions) {
    return this.http.post(this.serverUrl + '/postContestQuestions', contestQuestions, this.authOptionJson);
  }
  getAllQuestions() {
    return this.http.get(this.serverUrl + '/getAllQuestions', this.authOption);
  }
  deleteContest(contestName) {
    return this.http.delete(this.serverUrl + '/delContest/' + contestName, this.authOption);
  }
  updateContest(contestName) {

    return this.http.post(this.serverUrl + '/updateContest', contestName, this.authOptionJson);
  }
}
