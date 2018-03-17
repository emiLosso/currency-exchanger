import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: String;
  // icon = "/assets/img/icon.png"
  icon = "http://localhost:8000/static/client/currency-exchanger/src/assets/img/icon.png"

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
