import { ToastsManager } from 'ng2-toastr';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { LoginService } from './../../../shared-services/login.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  public credits = 0;
  private userEmail = '';
  public userData = {
    'firstname': '',
    'lastname': '',
    'contact': '',
    'email': '',
    'password': '',
    'isAdmin': false,
    'dob': ''
  };
  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private apiError: HandleApiErrorService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Check your credit score');
    this.userEmail = localStorage.getItem('userEmail');
    this.loginService.getUserData(this.userEmail).subscribe(
      data => {
        if (data === false) {
          this.toastr.error('Something terrible just happened', 'Opps!');
        }
        this.setData(data);
      },
      error => {
        this.apiError.apiError.emit(error);
      }
    );

    this.loginService.getCreditScore(this.userEmail).subscribe(
      data => {
        this.setCreditScore(data);
      },
      error => {
        this.apiError.apiError.emit(error);
      }
    );
  }
  setData(data) {
    this.userData = data;
  }
  setCreditScore(data) {
    this.credits = data.credits;
    console.log(this.credits);
  }

}
