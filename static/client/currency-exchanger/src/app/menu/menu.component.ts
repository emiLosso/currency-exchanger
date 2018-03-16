import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { Item } from './../classes/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: Item[];

  constructor(private loginService: LoginService) { }

  getItems(): void {
    this.items = [
      {"name":"Currencies", "url":"/currencies"} as Item,
      {"name":"Wallets", "url":"/wallets"} as Item,
      {"name":"Transactions", "url":"/transactions"} as Item
    ];
  }

  ngOnInit() {
  	this.getItems();
  }

}
