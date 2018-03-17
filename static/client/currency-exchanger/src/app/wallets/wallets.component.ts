import { Component, OnInit } from '@angular/core';
import { WalletService } from './../services/wallet.service';
import { CurrencyService } from './../services/currency.service';
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
  currencies: Currency[];
  user: String;
  selectedCurrency: Currency;

  constructor(private walletService: WalletService, private currencyService: CurrencyService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.user = localStorage.username;
    this.getWallets();
    this.getCurrencies();
  }

  getWallets(): void {
    this.walletService.getWallets()
    .subscribe(wallets => this.wallets = wallets);
  }

  getCurrencies(): void {
    this.currencyService.getHaventCurrencies()
        .subscribe(currencies => {
          this.currencies = currencies
          if (currencies.length === 0) return $('#newWallet').hide();
          $('#newWallet').show()
        });
  }

  add(): void {
    if (!this.selectedCurrency) return this.alertify.error('Must select a currency');
    
    const currency = this.selectedCurrency

    this.walletService.addWallet({ currency } as Wallet)
      .subscribe(wallet => {
        if (wallet) {
          $('#walletModal').modal('hide');

          this.alertify.success("Wallet created")

          this.wallets.push(wallet);
          this.currencies = this.currencies.filter(c => c.name != wallet.currency.name)
          if (this.currencies.length === 0) return $('#newWallet').hide();
        } else {
          this.alertify.error("Error creating wallet");
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
          this.currencies = this.currencies.filter(c => c !== currency);
          this.alertify.warning(`The wallet of currency ${wallet.currency.name} was deleted`)
          this.wallets = this.wallets.filter(w => w !== wallet);
          const currency: Currency = wallet.currency
          this.currencies.push(currency);
          $('#newWallet').show();
       });
    });
  }

}
