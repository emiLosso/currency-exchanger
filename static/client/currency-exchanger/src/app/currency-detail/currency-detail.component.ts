import { Component, OnInit, Input } from '@angular/core';
import { Currency } from './../classes/currency';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { CurrencyService } from './../services/currency.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {

  currency: Currency;

  constructor( private route: ActivatedRoute, private currencyService: CurrencyService, private location: Location) { }

  ngOnInit() {
  	this.getCurrency();
  }

  getCurrency(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.currencyService.getCurrency(id)
      .subscribe(currency => this.currency = currency);
  }

  save(): void {

    if (!this.currency.name) return alert('Must enter a name');
    if (!this.currency.sign) return alert('Must enter a sign');
    if (this.currency.sign.length > 5) alert('The sign must contain less than 5 characters');

    this.currencyService.updateCurrency(this.currency)
       .subscribe((currency) => {
         // if (currency) {
         //   swal({
         //     title: 'Currency updated',
         //     type: 'success',
         //   }).then(_ => this.goBack())
         // }
         if (currency) {
         	alert("currency updated");
         	this.goBack();
         }
       });
   }

  goBack = () => this.location.back()

  // agregar manejo de errores

}
