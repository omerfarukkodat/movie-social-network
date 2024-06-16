import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationResponse} from "../../services/models/authentication-response";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest : AuthenticationRequest = {email: '', password: ''};
  errorMessage: Array<String> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMessage = [];
    this.authService.authenticate(
      {
        body: this.authRequest
      }
    ).subscribe({
      next: (res: AuthenticationResponse) => {
        this.tokenService.token = res.token as string
        this.router.navigate(['movies']);
    },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors;
        }else {
          this.errorMessage.push(err.error.error);
        }
      }
    });
  }

  register() {
  this.router.navigate(['api/v1/auth/register'])
  }
}
