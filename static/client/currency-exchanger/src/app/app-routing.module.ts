import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { WalletsComponent }      from './wallets/wallets.component';
import { LoginComponent }      from './login/login.component';
import { MenuComponent }      from './menu/menu.component';
import { CurrenciesComponent }      from './currencies/currencies.component';
import { CurrencyDetailComponent }      from './currency-detail/currency-detail.component';
import { TransactionsComponent }      from './transactions/transactions.component';
// authenticate urls
import { AuthGuard } from './authentication/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'wallets', component: WalletsComponent, canActivate: [AuthGuard]},
  { path: 'currencies', component: CurrenciesComponent, canActivate: [AuthGuard]},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  { path: 'currency/:id', component: CurrencyDetailComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/wallets', pathMatch: 'full' },
  { path: '**', redirectTo: '/wallets'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}