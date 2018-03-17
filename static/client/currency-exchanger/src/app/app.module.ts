import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { WalletsComponent } from './wallets/wallets.component';
import { AppRoutingModule } from './/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { LoginService } from './services/login.service';
import { CurrencyService } from './services/currency.service';

import { HttpClientModule }    from '@angular/common/http';
import { AuthGuard } from './authentication/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './authentication/interceptors/auth.interceptor';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WalletsComponent,
    MenuComponent,
    CurrenciesComponent,
    CurrencyDetailComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

export class AppModule { }


    
