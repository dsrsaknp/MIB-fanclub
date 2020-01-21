import { ContestService } from './../../../shared-services/contest.service';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { LoginService } from './../../../shared-services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public error = true;
  private userEmail = '';
  private qId = '';
  private isLinear = false;
  public noOfQue;
  public navigationCount = 0;
  public quizName = 'Master Blaster';
  public questions = [
    {
      'que': '',
      'opt': [
        {
          'value': ''
        },
        {
          'value': ''
        }
      ],
      'ans': 0
    }
  ];
  public answers = [];
  private userData;
  public inProgress = true;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    public toastr: ToastsManager,
    private apiError: HandleApiErrorService,
    private contestService: ContestService,

  ) { }

  ngOnInit() {
    this.inProgress = true;
    this.titleService.setTitle('Take the quiz');
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.quizName = params.get('name');
        this.qId = params.get('id');
      }
    );

    this.userEmail = localStorage.getItem('userEmail');


    const key = {
      qId: this.qId,
      name: this.quizName,
      userEmail: this.userEmail
    };
    this.contestService.getQuestions(key).subscribe((data) => {
      this.setData(data);
    });

    this.loginService.getUserData(this.userEmail).subscribe(
      data => {
        this.userData = data;
      },
      error => {
        this.apiError.apiError.emit(error);
      }
    );
  }

  setData(data) {
    if (!data) {
      this.inProgress = false;
      return;
    }
    this.questions = data;
    this.noOfQue = this.questions.length;
    for (let i = 0; i < this.noOfQue; i++) {
      this.answers[i] = false;
    }
    this.error = false;
    this.inProgress = false;
  }

  goForward(stepper: MatStepper, index, option, ans) {
    if (option === ans - 1) {
      this.answers[index] = true;
    } else {
      this.answers[index] = false;
    }
    console.log(this.answers);
    // stepper.next();
  }
  submit() {

    let score = 0;
    this.answers.forEach(element => {
      if (element === true) {
        score++;
      }
    });
    this.toastr.success('You just recived ' + score + ' credits !', 'Success!');
    const dataTobeSent = {
      username: this.userEmail,
      fname: this.userData.firstname,
      lname: this.userData.lastname,
      score: score,
      userEmail: this.userEmail,
      qId: this.qId,
      qName: this.quizName
    };
    this.contestService.postCreditScore(dataTobeSent).subscribe(
      data => {
        this.router.navigate(['/account/credit']);
      },
      error => {
        this.toastr.error('There is something seriously wrong with the server!', 'Oops!');
        // this.apiError.apiError.emit(error);
      }
    );
  }
}
