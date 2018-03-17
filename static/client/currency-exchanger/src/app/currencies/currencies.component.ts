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

    if (!name) return alert('Must enter a name');
    if (!sign) return alert('Must enter a sign');
    if (sign.length > 5) return alert('The sign must contain less than 5 characters');

    this.currencyService.addCurrency({ name, sign } as Currency)
      .subscribe(currency => {
        if (currency) {
          $('#currencyModal').modal('hide');

          // swal({
          //   title: 'Currency created',
          //   type: 'success',
          // })

          alert("currency created")

          this.currencies.push(currency);
        }
      });
  }

  // delete(currency: Currency): void {
  //   swal({
  //     title: 'Are you sure?',
  //     text: `All wallets with ${currency.name} currency will be destroy`,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.currencyService.deleteCurrency(currency).subscribe(error => {
  //         if (error) return;
          
  //         this.currencies = this.currencies.filter(c => c !== currency);

  //         swal(
  //           'Deleted!',
  //           `The currency ${currency.name} was deleted`,
  //           'success'
  //         )
  //       });
  //     }
  //   })
  // }

  delete(currency: Currency): void {
    // confirm dialog
    this.alertify.confirm('Are you sure you want to remove this currency?',
    () => {
      //delete
      this.currencyService.deleteCurrency(currency).subscribe(error => {
        if (error) return;
          this.currencies = this.currencies.filter(c => c !== currency);
          this.alertify.alert(`The currency ${currency.name} was deleted`)
       });
    });


  }

}
