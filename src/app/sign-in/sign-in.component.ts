import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginData = {email: '', password: ''};

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  signInUser() {
    this.authenticationService.login(this.loginData).subscribe();
  }
}
