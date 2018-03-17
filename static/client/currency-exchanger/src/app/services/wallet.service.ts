import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wallet } from './../classes/wallet';
import { LoginService } from './../services/login.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WalletService {

  private walletUrl = 'http://localhost:8000/api/wallets';

  constructor(private http: HttpClient, private loginService:LoginService) { }

  //methods
  getWallets (): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl+'/')
      .pipe(
        // tap(wallets => this.log(`fetched wallets`)),
        catchError(this.handleError('getWallets', []))
      );
  }

  addWallet (wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.walletUrl + '/', wallet, httpOptions).pipe(
      // tap((Wallet: Wallet) => this.log(`added Wallet w/ id=${Wallet.id}`)),
      catchError(this.handleError<Wallet>('adWallet'))
    );
  }

  deleteWallet (Wallet: Wallet | number): Observable<Wallet> {
    const id = typeof Wallet === 'number' ? Wallet : Wallet.id;
    const url = `${this.walletUrl}/${id}/`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Wallet>(url, httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<any>('deleteWallet'))
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
