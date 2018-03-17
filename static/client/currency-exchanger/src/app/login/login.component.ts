import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './../services/login.service';
import { AlertifyService } from './../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private alertify: AlertifyService,
              private router: Router) { }

  verifyLogout(): void {
    if (this.loginService.isAuthenticated()) {
      this.loginService.logout();
    }
  }

  login(username:string, password:string): void {
    if (!username) { this.alertify.error("Must enter a username"); return}
    if (!password) { this.alertify.error("Must enter a password"); return}
    this.loginService.login(username, password)
      .subscribe(logged => {
        if (logged == null) {
          this.alertify.error("Bad credentials")
        } else {
          this.router.navigate(['/wallets']);
        }
      });
  }

  ngOnInit() {
    this.verifyLogout();
  }

}
