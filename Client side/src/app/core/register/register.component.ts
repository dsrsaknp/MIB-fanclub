import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ApiService } from '../../shared-services/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  verified = false;
  emailSent = false;
  minDate = new Date(1950, 0, 1);
  maxDate = new Date();
  rForm: FormGroup;
  public DOBinit = '';
  public inProgress = false;
  @ViewChild('email') email;
  public message = '';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public thisDialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      'fname': [null, [Validators.required, Validators.pattern('^[a-zA-Z]+(([\'][a-zA-Z])?[a-zA-Z]*)*$'), Validators.maxLength(15), Validators.minLength(1)]],
      // tslint:disable-next-line:max-line-length
      'lname': [null, [Validators.required, Validators.pattern('^[a-zA-Z]+(([\'][a-zA-Z])?[a-zA-Z]*)*$'), Validators.maxLength(15), Validators.minLength(1)]],
      // tslint:disable-next-line:max-line-length
      // 'uname': [null, [Validators.required, Validators.pattern('^[A-Za-z][a-zA-Z0-9-@./_#&$!+\w]*'), Validators.maxLength(15), Validators.minLength(6)]],
      // tslint:disable-next-line:max-line-length
      'contact': [null, [Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*\-\\s*)?|[0]?)?[6789]\\d{9}$')]],
      //  'DOBdisp': [{value: null, disabled: true}],
      'DOB': [{ value: '' }, Validators.required],
      // tslint:disable-next-line:max-line-length
      'email': [null, [Validators.required, Validators.email, Validators.pattern('^[A-Za-z][A-Z0-9a-z\.]*@[A-Za-z][A-Za-z0-9]+[\.][A-Za-z]{2,3}'), Validators.maxLength(40)]],
      // tslint:disable-next-line:max-line-length
      'password': [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,16}')]],
      // 'password': [null, [Validators.required, Validators.pattern('^[A-Za-z][a-zA-Z]*')]],
      'confirmedPassword': [null, Validators.required],
      'otp': [null]
    },
      {
        validator: this.matchPassword
      });
  }
  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPass = AC.get('confirmedPassword').value;
    if (!(password === confirmPass)) {
      AC.get('confirmedPassword').setErrors({ passwordMismatch: true });
    } else {
      AC.get('confirmedPassword').setErrors(null);
      return null;
    }
  }

  verifyEmail() {
    const emailTo = this.email.nativeElement.value;
        const userEmail = {
      userEmail: emailTo
    };
    this.message = 'Sending E-mail.. Please Wait';
    this.api.verifyEmail(userEmail).subscribe(data => {

      if (data === 'sent') {
        this.message = 'Email has been sent. Please check Inbox';
        this.emailSent = true;
      } else {
        this.message = 'Email cannot be sent,Try again';
      }
    });
  }

  addUser(post) {
    this.inProgress = true;
    const obj = {
      firstname: post.fname,
      lastname: post.lname,
      password: post.password,
      email: post.email.trim(),
      dob: this.DOBinit,
      contact: post.contact,
      otp: post.otp
    };
    this.api.register(obj).subscribe(data => {
      const res = JSON.stringify(data);
      // tslint:disable-next-line:triple-equals
      if (data === 'true') {
        this.inProgress = false;
        this.verified = true;
        alert('Thanks for Registering with MIB, Please LogIn');
        this.closeDialog();
        this.router.navigate(['/']);
        // tslint:disable-next-line:triple-equals
      } else if (data === 'duplicate') {
        this.message = 'Email is already registered';
        alert('Login with the existing email ID or create a new account');
        this.closeDialog();
      } else {
        this.message = 'Email  did not verified correctly';
      }
      this.inProgress = false;
    });
  }
  closeDialog() {
    this.thisDialogRef.close();
  }
  showLogin() {

  }
}
