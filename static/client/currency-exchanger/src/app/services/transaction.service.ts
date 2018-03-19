import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './../classes/transaction';
import { LoginService } from './../services/login.service';
import { AlertifyService } from './../services/alertify.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TransactionService {

  private transactionUrl = 'http://localhost:8000/api/transactions';

  constructor(private http: HttpClient, private loginService:LoginService,
              private alertify:AlertifyService) { }

  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl+'/')
      .pipe(
        catchError(this.handleError('getTransactions', []))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl + '/', transaction, httpOptions).pipe(
      catchError(this.handleError<Transaction>('createTransaction'))
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
