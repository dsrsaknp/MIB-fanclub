import { ToastsManager } from 'ng2-toastr';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { ContestService } from './../../../shared-services/contest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-contests',
  templateUrl: './upcoming-contests.component.html',
  styleUrls: ['./upcoming-contests.component.css']
})
export class UpcomingContestsComponent implements OnInit {

  text: any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: 'Weeks',
    Days: 'Days',
    Hours: 'Hours',
    Minutes: 'Minutes',
    Seconds: 'Seconds',
    MilliSeconds: 'MilliSeconds'
  };

  public contestData = [{
    id: 0,
    name: '',
    text: '',
    img: '../../assets/images/fans01.jpg',
  }];
  private isLoggedIn = false;

  constructor(private contestService: ContestService, private apiError: HandleApiErrorService, public toastr: ToastsManager) { }

  ngOnInit() {
    this.isLoggedIn = (localStorage.getItem('userEmail') ? true : false);
    this.contestService.getUpcomingContests().subscribe(
      data => {
        this.setData(data);
      },
      error => {
        this.apiError.apiError.emit(error);
      }
    );
  }
  setData(data) {
    this.contestData = data;
  }

  sendNotification(name) {
    if (!this.isLoggedIn) {
      this.toastr.warning('Please login...', 'Oops!');
      return;
    }
    const data = {
      'userEmail': localStorage.getItem('userEmail'),
      'name': name
    };
    this.contestService.sendNotification(data).subscribe(res => {
      if (res) {
        this.toastr.info('We will notify you when the event happens');
      } else {
        this.toastr.error('Not our fault. Maybe some proxy issue', 'Oops!');
      }
    });


  }

}
