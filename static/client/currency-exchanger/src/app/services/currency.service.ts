import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency } from './../classes/currency';
import { LoginService } from './../services/login.service';
import { AlertifyService } from './../services/alertify.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CurrencyService {

  private currencyUrl = 'http://localhost:8000/api/currencies';

  constructor( private http: HttpClient, private loginService:LoginService,
               private alertify:AlertifyService) { }

  //methods
  getCurrencies (): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currencyUrl+'/')
      .pipe(
        // tap(currencies => this.log(`fetched currencies`)),
        catchError(this.handleError('getCurrencies', []))
      );
  }

  getCurrency(id: number): Observable<Currency> {
    const url = `${this.currencyUrl}/${id}/`;
    return this.http.get<Currency>(url).pipe(
      // tap(_ => console.log(`fetched currency id=${id}`)),
      catchError(this.handleError<Currency>('getCurrency'))
    );
  }

  updateCurrency (currency: Currency): Observable<any> {
  	const url = `${this.currencyUrl}/${currency.id}/`
    return this.http.put(url, currency, httpOptions).pipe(
      // tap(_ => this.log(`updated currency id=${currency.id}`)),
      catchError(this.handleError<any>('updateCurrency'))
    );
  }

  addCurrency (currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.currencyUrl + '/', currency, httpOptions).pipe(
      // tap((currency: Currency) => this.log(`added currency w/ id=${currency.id}`)),
      catchError(this.handleError<Currency>('addCurrency'))
    );
  }

  deleteCurrency (currency: Currency | number): Observable<Currency> {
    const id = typeof currency === 'number' ? currency : currency.id;
    const url = `${this.currencyUrl}/${id}/`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Currency>(url, httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<any>('deleteCurrency'))
    );
  }

  // FOR WALLETS CONTROLLER:currencies that a user hasn't in your wallets
  getHaventCurrencies (): Observable<Currency[]> {
    const url = `${this.currencyUrl}/havent_currencies/`
    return this.http.get<Currency[]>(url)
      .pipe(
        // tap(currencies => console.log(`fetched currencies`)), // Do something
        catchError(this.handleError('fetching currencies', []))
      );
  }

  // HANDLE HTTP OPERATIONS WHEN FAILED
  private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
       let errorMsg: string;

       const hasDetail = error.error.detail ? true : false

       if (hasDetail) {
         errorMsg = error.error.detail
       } else {
         let key = Object.keys(error.error)[0]
         errorMsg = error.error[key][0]
       }

       errorMsg = typeof errorMsg === 'string' ? errorMsg : 'server error, can not load response'

       this.alertify.alert(`Error ${operation}: ${errorMsg}`)

       if (error.status === 401) this.loginService.logout();

       return of(result as T);
     };
  }

}
