import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest : RegistrationRequest = {email : '', firstname : '', lastname : '', password : ''}

}
