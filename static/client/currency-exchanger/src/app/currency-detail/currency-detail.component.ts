import { Component, OnInit, Input } from '@angular/core';
import { Currency } from './../classes/currency';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { CurrencyService } from './../services/currency.service';
import { AlertifyService } from './../services/alertify.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {

  currency: Currency;

  constructor( private route: ActivatedRoute, private currencyService: CurrencyService,
  	private location: Location, private alertify: AlertifyService) { }

  ngOnInit() {
  	this.getCurrency();
  }

  getCurrency(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.currencyService.getCurrency(id)
      .subscribe(currency => this.currency = currency);
  }

  save(): void {

    if (!this.currency.name) return this.alertify.error('Must enter a name');
    if (!this.currency.sign) return this.alertify.error('Must enter a sign');
    if (this.currency.sign.length > 5) this.alertify.error('The sign must contain less than 5 characters');

    this.currencyService.updateCurrency(this.currency)
       .subscribe((currency) => {
		  if (currency) {
		 	this.alertify.success("Currency updated");
		 	this.goBack();
		  }
       });
   }

  goBack = () => this.location.back()

}
