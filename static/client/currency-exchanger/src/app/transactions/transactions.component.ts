import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../services/transaction.service';
import { WalletService } from './../services/wallet.service';
import { UserService } from './../services/user.service';
import { AlertifyService } from './../services/alertify.service';
import { Wallet } from './../classes/wallet';
import { Transaction } from './../classes/transaction';
import { User } from './../classes/user';

declare var jquery:any;
declare var $ :any;

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
  selectedWallet: Wallet;
  selectedUser: User;

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
        .subscribe(users => {
          this.users = users.filter(user => user.username != this.user)
        });
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  sameUser(username:string): boolean {
    return this.user == username
  }

  add(amount: number): any {
    if (this.selectedWallet === undefined) return this.alertify.error('Must select a wallet');
    if (this.selectedUser === undefined) return this.alertify.error('Must select a user');
    if (!amount) return this.alertify.error('Must enter an amount');
    if (amount < 1) return this.alertify.error('The amount must be positive');

    if (amount > this.selectedWallet.balance){
        return this.alertify.error('The amount is greater than the balance of the wallet selected');
    } 

    let origin = this.selectedWallet
    let to_user = this.selectedUser

    this.walletService.getWalletOfUser(to_user, origin.currency)
      .subscribe(destination => {
          if (!destination){
            this.alertify.error(`Error creating transaction: ${to_user.username} has not a wallet of currency ${origin.currency.name}`)
            return; 
          }
          
          destination = destination[0]

          this.transactionService.addTransaction({ destination, origin, amount } as Transaction)
            .subscribe(transaction => {
              if (transaction) {
                $('#transactionModal').modal('hide');
                this.alertify.success("Transaction created");
                this.transactions.push(transaction);
              }
            });
        })
  }
}
