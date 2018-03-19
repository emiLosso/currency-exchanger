import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wallet } from './../classes/wallet';
import { User } from './../classes/user';
import { Currency } from './../classes/currency';
import { LoginService } from './../services/login.service';
import { AlertifyService } from './../services/alertify.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WalletService {

  private walletUrl = 'http://localhost:8000/api/wallets';

  constructor(private http: HttpClient, private loginService:LoginService,
              private alertify:AlertifyService) { }

  //methods
  getWallets (): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl+'/')
      .pipe(
        catchError(this.handleError('getWallets', []))
      );
  }

  addWallet (wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.walletUrl + '/', wallet, httpOptions).pipe(
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
      catchError(this.handleError<any>('deleteWallet'))
    );
  }

  getWalletOfUser(user: User, currency: Currency): Observable<Wallet> {
    const url = `${this.walletUrl}/${user.id}/get_wallet_of_user/`;

    return this.http.post<Wallet>(url, currency, httpOptions).pipe(
      catchError(this.handleError2<any>('error'))
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

  private handleError2<T> (operation = 'operation', result?: T) {
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

       // this.alertify.alert(`Error ${operation}: ${errorMsg}`)

       if (error.status === 401) this.loginService.logout();

       return of(result as T);
     };
  }

}
