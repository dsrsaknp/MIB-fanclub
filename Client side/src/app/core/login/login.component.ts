import { AdalService } from 'ng2-adal/dist/core';
import { ApiService } from '../../shared-services/api.service';
import { Component, OnInit, Output, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../../shared-services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any;
  loginValue: boolean;
  rForm: FormGroup;
  post: any;
  private isUser = true;
  public inProgress = false;
  public userEmail = '';
  // @Output()
  // notify = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService,
    private adalService: AdalService,
    public thisDialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.rForm = fb.group({
      // tslint:disable-next-line:max-line-length
      'UID': [null, [Validators.required, Validators.email, Validators.pattern('^[A-Za-z][A-Z0-9a-z\.]*@[A-Za-z][A-Za-z0-9]+[\.][A-Za-z]{2,3}')]],
      // tslint:disable-next-line:max-line-length
      'password': [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,16}')]]
    });
  }

  ngOnInit() {
  }


  addPost(post) {
    this.loginValue = true;
    const obj = {
      email: post.UID,
      pswd: post.password
    };
    this.inProgress = true;
    this.api.login(obj).subscribe(data => {
      if (data) {
        this.userData = data;
        localStorage.setItem('userName', this.userData.data.firstname);
        localStorage.setItem('userEmail', this.userData.data.email);
        localStorage.setItem('isAdmin', this.userData.data.isAdmin);
        localStorage.setItem('jwtToken', this.userData.token);
        this.loginService.setUserData(data);
        if (this.userData.data.isAdmin) {
          this.loginService.isAdmin = true;
          this.loginService.notifyLogin.emit(true);
        } else {
          this.loginService.notifyLogin.emit(false);
        }
        this.inProgress = false;
        this.closeDialog();
        if (this.userData.data.isAdmin === true) {
          this.router.navigate(['admin']);
        }
      } else {
        this.isUser = false;
        this.inProgress = false;
      }
    });
  }

  openRegister() {
    this.thisDialogRef.close();
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      height: '75%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  closeDialog() {
    this.thisDialogRef.close();
  }
  openForgotPass() {
    this.inProgress = true;
    const email = {
     email: this.userEmail
    };
    this.loginService.forgotPass(email).subscribe(data => {
      this.inProgress = false;
        if (data === 'true') {
          Swal({
            title: 'Email sent',
            text: 'A temporary password was sent to your email',
            type: 'success',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.value) {
              this.thisDialogRef.close();
          }});
        } else {
        Swal({
          title: 'Not Registered',
            text: 'Please create an account with Mib',
            type: 'warning',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok',
        });
      }
  });
}

  adalLogin() {
    sessionStorage.setItem('adal', 'adal');
    sessionStorage.setItem('adalLogout', 'adalLogout');
    this.adalService.login();
  }

}
