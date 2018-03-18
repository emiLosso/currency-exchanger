import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { AlertifyService } from './services/alertify.service';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { AppRoutingModule } from './/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
// services
import { LoginService } from './services/login.service';
import { CurrencyService } from './services/currency.service';
import { WalletService } from './services/wallet.service';
import { TransactionService} from './services/transaction.service';
import { UserService} from './services/user.service';
// rest
import { HttpClientModule }    from '@angular/common/http';
import { AuthGuard } from './authentication/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './authentication/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WalletsComponent,
    MenuComponent,
    CurrenciesComponent,
    CurrencyDetailComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
  	FormsModule,
    NgbModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Angular2FontawesomeModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    LoginService,
    CurrencyService,
    AlertifyService,
    WalletService,
    TransactionService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

export class AppModule { }


    
