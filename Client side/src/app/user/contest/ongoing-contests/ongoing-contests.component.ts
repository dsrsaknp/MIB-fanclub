import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../shared-services/login.service';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { ContestService } from './../../../shared-services/contest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing-contests',
  templateUrl: './ongoing-contests.component.html',
  styleUrls: ['./ongoing-contests.component.css']
})
export class OngoingContestsComponent implements OnInit {

  public dataToBeShown = 0;
  private isLoggedIn = false;
  public data = [
    {
      id: 0,
      name: '',
      text: '',
      img: 'http://static.sify.com/cms/image/rldqAGdiifidb_medium.jpg'
    }
  ];
  constructor(
    private contestService: ContestService,
    private apiError: HandleApiErrorService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastsManager
  ) { }

  ngOnInit() {
    this.dataToBeShown = 3;
    this.getDataFromServer(this.dataToBeShown);
    this.isLoggedIn = (localStorage.getItem('userEmail')) ? true : false;
  }

  getDataFromServer(num) {
    this.contestService.getContests(num).subscribe(
      data => {
        this.setData(data);
      },
      error => {
        this.apiError.apiError.emit(true);
      }
    );
  }

  setData(dt) {
    this.data = dt;

  }
  goToQuiz(qName, qId) {

    if (this.isLoggedIn) {
      this.router.navigate([qName + '/' + qId], { relativeTo: this.activatedRoute });
    } else {
      this.toaster.warning('Please login to participate!', 'Oops!');
    }
  }

}
