import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../services/currency.service';
import { Currency } from './../classes/currency';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies()
    .subscribe(currencies => this.currencies = currencies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.currencyService.addCurrency({ name } as Currency)
      .subscribe(currency => {
        this.currencies.push(currency);
      });
  }

  delete(currency: Currency): void {
    this.currencies = this.currencies.filter(h => h !== currency);
    this.currencyService.deleteCurrency(currency).subscribe();
  }

}
