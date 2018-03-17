import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../services/currency.service';
import { AlertifyService } from './../services/alertify.service';
import { Currency } from './../classes/currency';

// to use jquery
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[];

  constructor(private currencyService: CurrencyService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies()
    .subscribe(currencies => this.currencies = currencies);
  }

  add(name: string, sign: string): void {
    name = name.trim();
    sign = sign.trim();

    if (!name) return this.alertify.error('Must enter a name');
    if (!sign) return this.alertify.error('Must enter a sign');
    if (sign.length > 5) return this.alertify.error('The sign must contain less than 5 characters');

    this.currencyService.addCurrency({ name, sign } as Currency)
      .subscribe(currency => {
        if (currency) {
          $('#currencyModal').modal('hide');

          this.alertify.success("Currency created")

          this.currencies.push(currency);
        }
      });
  }

  delete(currency: Currency): void {
    // confirm dialog
    this.alertify.confirm(`Are you sure you want to remove <span class="bolder">${currency.name}</span> currency? <div> All wallets with <span class="bolder">${currency.name}</span> currency will be destroy </div>`,
    () => {
      //delete
      this.currencyService.deleteCurrency(currency).subscribe(error => {
        if (error) return;
          this.currencies = this.currencies.filter(c => c !== currency);
          this.alertify.success(`The currency ${currency.name} was deleted`)
       });
    });
  }

}
