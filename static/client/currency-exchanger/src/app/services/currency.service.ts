import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency } from './../classes/currency';
import { LoginService } from './../services/login.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CurrencyService {

  private currencyUrl = 'http://localhost:8000/api/currencies';

  constructor( private http: HttpClient, private loginService:LoginService) { }

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

  //HANDLE ERRORS
	 /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    // this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
