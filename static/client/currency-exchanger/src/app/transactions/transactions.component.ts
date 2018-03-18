import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../services/transaction.service';
import { WalletService } from './../services/wallet.service';
import { UserService } from './../services/user.service';
import { AlertifyService } from './../services/alertify.service';
import { Wallet } from './../classes/wallet';
import { Transaction } from './../classes/transaction';
import { User } from './../classes/user';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  wallets: Wallet[];
  transactions: Transaction[];
  users: User[];
  user: String;
  // selectedCurrency: Currency;

  constructor(private transactionService: TransactionService, private walletService: WalletService,
              private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
  	this.user = localStorage.username;
  	this.getUsers();
  	this.getWallets();
  	this.getTransactions();
  }

  getWallets(): void {
    this.walletService.getWallets()
    .subscribe(wallets => this.wallets = wallets);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  // getWalletsOfUser(): void {
  //   this.walletService.getWalletsOfUser()
  //   .subscribe(wallets => this.wallets = wallets);
  // }

}
