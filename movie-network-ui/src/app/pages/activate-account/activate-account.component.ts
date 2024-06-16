import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = true;
  isSubmitted: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }


  onCodeCompleted(token: string) {
    this.confirmAccount(token);

  }

  redirectToLogin() {
  this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm(
      {
        token
      }
    ).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login.';
        this.isSubmitted=true;
        this.isOkay=true;
      },
      error: () => {
      this.message = 'Token has been expired or invalid.';
      this.isSubmitted=true;
      this.isOkay=false;
      }
    });

  }
}
