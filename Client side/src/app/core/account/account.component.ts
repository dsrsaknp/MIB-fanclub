import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../shared-services/login.service';
import { LoggedInUser } from '../user';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ApiService } from '../../shared-services/api.service';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  DOBinit = '';
  forAdal = true;
  minDate = new Date(1950, 0, 1);
  maxDate = new Date();
  public inProgress = false;
  Details: any;
  checked: any;
  rForm: FormGroup;
  public userData;
  constructor(private loginService: LoginService, private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Edit account');
    this.rForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      'fname': [''],
      // tslint:disable-next-line:max-line-length
      'lname': [''],
      // tslint:disable-next-line:max-line-length
      'contact': [''],
      'DOB': [''],
      // tslint:disable-next-line:max-line-length
      'email': [{ value: '', disabled: true }],
      'currentpassword': [null],
      // tslint:disable-next-line:max-line-length
      'password': [''],
      'confirmedPassword': [null],
      'checkpswd': ['']
    });
    this.setUserData();

    if (sessionStorage.getItem('adalLogout')) {
      this.forAdal = false;
    }
  }

  setUserData() {
    const email = localStorage.getItem('userEmail');
    this.loginService.getUserData(email).subscribe(
      (data) => {
        this.userData = data;
        this.DOBinit = this.userData.dob;
        this.createform(this.userData);
      });

  }

  afterUpdate() {
    this.setUserData();
  }

  createform(userData) {
    this.rForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      'fname': [userData.firstname, [Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(15), Validators.minLength(2)]],
      // tslint:disable-next-line:max-line-length
      'lname': [userData.lastname, [Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(15), Validators.minLength(2)]],
      // tslint:disable-next-line:max-line-length
      'contact': [userData.contact, [Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*\-\\s*)?|[0]?)?[6789]\\d{9}$')]],
      // tslint:disable-next-line:max-line-length
      'DOB': [{ value: userData.dob, disabled: true }],
      'email': [{ value: userData.email, disabled: true }],
      // tslint:disable-next-line:max-line-length
      'currentpassword': [null, [Validators.required]],
      // tslint:disable-next-line:max-line-length
      'password': [null],
      'confirmedPassword': [null],
      'checkpswd': ['']
    },
      {
        validator: this.matchPassword
      });
  }
  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPass = AC.get('confirmedPassword').value;
    if (password !== confirmPass) {
      AC.get('confirmedPassword').setErrors({ passwordMismatch: true });
    } else {
      AC.get('confirmedPassword').setErrors(null);
      return null;
    }
  }
  updateUser(post) {

    this.inProgress = true;
    const email = this.userData.email;
    if (this.checked) {
      this.Details = {
        firstname: post.fname,
        lastname: post.lname,
        contact: post.contact,
        currpassword: post.currentpassword,
        newpassword: post.password,
        dob: this.DOBinit
      };
    } else {
      this.Details = {
        firstname: post.fname,
        lastname: post.lname,
        contact: post.contact,
        currpassword: post.currentpassword,
        newpassword: '',
        dob: this.DOBinit
      };
    }

    this.api.updateUser(email, this.Details).subscribe(
      res => {
        this.inProgress = false;
        if (res) {
          this.snackBar.open('Details updated', '', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Password does not match with our database', '', {
            duration: 2000,
          });
        }
        this.afterUpdate();
        localStorage.setItem('userName', post.fname);
        this.loginService.notifyLogin.emit(this.userData.isAdmin);
      }
    );

  }


  reset() {
    this.setUserData();
  }
  passReq(val) {
    this.checked = val;

    if (val) {
      // tslint:disable-next-line:max-line-length
      this.rForm.get('password').setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,16}')]);
      this.rForm.get('confirmedPassword').setValidators(Validators.required);
    } else {
      this.createform(this.userData);
    }

  }
}

