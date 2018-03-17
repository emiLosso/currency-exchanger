import { Component, OnInit } from '@angular/core';
import { WalletService } from './../services/wallet.service';
import { AlertifyService } from './../services/alertify.service';
import { Wallet } from './../classes/wallet';
import { Currency } from './../classes/currency';

// to use jquery
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  wallets: Wallet[];
  selectedCurrency: Currency;
  selectedWallet: Wallet;
  currencies: Currency[];
  user: String;

  constructor(private walletService: WalletService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.user = localStorage.username;
  	this.getWallets();
  }

  getWallets(): void {
    this.walletService.getWallets()
    .subscribe(wallets => this.wallets = wallets);
  }

  // add(wallet: Wallet, balance: integer): void {

  //   if (!wallet) return this.alertify.error('Must select a wallet');
  //   if (!balance) return this.alertify.error('Must enter an amount');
  //   // fijarse lo de monto negativo

  //   this.walletService.addWallet({ wallet, balance } as Wallet)
  //     .subscribe(currency => {
  //       if (currency) {
  //         $('#currencyModal').modal('hide');

  //         this.alertify.success("Currency created")

  //         this.currencies.push(currency);
  //       }
  //     });
  // }

  add(): void {
    if (!this.selectedCurrency) return this.alertify.error('Must select a currency');
    
    const currency = this.selectedCurrency

    this.walletService.addWallet({ currency } as Wallet)
      .subscribe(wallet => {

        if (wallet) {
          $('#walletModal').modal('hide');

          // swal({
          //   title: 'Wallet created',
          //   type: 'success',
          // })

          this.wallets.push(wallet);
          this.currencies = this.currencies.filter(c => c.name != wallet.currency.name)
          if (this.currencies.length === 0) return $('#newWallet').hide();
        } else {
          // swal({
          //   title: 'Error creating wallet',
          //   type: 'error',
          // })
        }

      });
  }

  delete(wallet: Wallet): void {
    // confirm dialog
    this.alertify.confirm(`Are you sure you want to remove the wallet of currency ${wallet.currency.name}?`,
    () => {
      //delete
      this.walletService.deleteWallet(wallet).subscribe(error => {
        if (error) return;
          this.wallets = this.wallets.filter(c => c !== wallet);
          this.alertify.success(`The wallet of currency ${wallet.currency.name} was deleted`)
       });
    });
  }

}
