import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  verifyLogout(): void {
    // if (this.loginService.isAuthenticated()) {
    //   this.loginService.logout();
    // }
  }

  login(username:string, password:string): void {
    console.log(username)
    if (!username) { return; }
    if (!password) { return; }
    this.loginService.login(username, password)
      .subscribe(logged => {
        if (logged == null) {
          alert("bad credentials")
        } else {
          this.router.navigate(['/wallets']);
        }
      });
  }

  ngOnInit() {
    this.verifyLogout();
  }

}
