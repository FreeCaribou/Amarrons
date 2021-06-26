import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorCommunicationService } from 'src/app/shared/services/communication/error.communication.service';
import { FormCommunicationService } from 'src/app/shared/services/communication/form.communication.service';
import { LoaderCommunicationService } from 'src/app/shared/services/communication/loader.communication.service';
import { UserCommunicationService } from 'src/app/shared/services/communication/user.communication.service';
import { UserService } from 'src/app/shared/services/data/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  newAccount = false;

  constructor(
    public userService: UserService,
    public userCommunication: UserCommunicationService,
    public loaderCommunication: LoaderCommunicationService,
    public errorCommunication: ErrorCommunicationService,
    public router: Router,
    public formCommunication: FormCommunicationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formCommunication.buildLoginForm();
  }

  onLogin() {
    this.loaderCommunication.isLoading = true;
    this.userService.login(this.loginForm.value).subscribe((data) => {
      this.connect(data);
    }, error => {
      this.errorCommunication.throwError(error);
    }, () => {
      this.loaderCommunication.isLoading = false;
    })
  }

  onSignUp() {
    this.loaderCommunication.isLoading = true;
    this.userService.signUp(this.loginForm.value).subscribe(data => {
      this.connect(data);
    }, error => {
      this.errorCommunication.throwError(error);
    }, () => {
      this.loaderCommunication.isLoading = false;
    })
  }

  connect(data) {
    this.userCommunication.user = data;
    localStorage.setItem('user_token', data.token);
  }

}