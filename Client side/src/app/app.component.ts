import { AdalService } from 'ng2-adal/dist/core';
import { SecretService } from './shared-services/adal/secret.service';
import { LoginService } from './shared-services/login.service';
import { ToastsManager } from 'ng2-toastr';
import { HandleApiErrorService } from './handle-api-error.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isAdmin = false;
  public error = false;
  public errText = '';
  constructor(
    private adalService: AdalService,
    private secretService: SecretService,
    private apiErrorService: HandleApiErrorService,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
    private loginService: LoginService,
  ) {

    this.adalService.init(this.secretService.adalConfig);
    this.toastr.setRootViewContainerRef(vRef);
  }
  ngOnInit(): void {

    this.adalService.handleWindowCallback();
    this.adalService.getUser();

    this.apiErrorService.apiError.subscribe(err => {
      console.log(err);

    });
    this.loginService.notifyLogin.subscribe(isAdm => {
      this.isAdmin = isAdm;

    });
    this.loginService.notifyLogout.subscribe(bool => {
      this.isAdmin = false;
    });
  }
}
