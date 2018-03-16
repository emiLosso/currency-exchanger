import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:8000/api/api-token-auth';  // URL to web api

  constructor( private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.token
  }

  isAuthenticated(): boolean {
    return localStorage.token != null
  }

  getUsername(): string {
    return localStorage.username
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.loginUrl + '/',
                          JSON.stringify({ username: username, password: password }),
                          httpOptions).pipe(
		tap((token:any) => {
      console.log(token);
			localStorage.token = token.token
			localStorage.username = username
		}),
		catchError(this.handleError<any>('login'))
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