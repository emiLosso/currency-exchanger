import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { WalletsComponent }      from './wallets/wallets.component';
import { LoginComponent }      from './login/login.component';
import { MenuComponent }      from './menu/menu.component';
import { CurrenciesComponent }      from './currencies/currencies.component';
import { CurrencyDetailComponent }      from './currency-detail/currency-detail.component';
// authenticate urls
import { AuthGuard } from './authentication/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/wallets', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'wallets', component: WalletsComponent, canActivate: [AuthGuard]},
  { path: 'currencies', component: CurrenciesComponent, canActivate: [AuthGuard]},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  { path: 'currency/:id', component: CurrencyDetailComponent, canActivate: [AuthGuard] },
  // { path: 'wallets', component: WalletsComponent},
  // { path: 'currencies', component: CurrenciesComponent},
  // { path: 'menu', component: MenuComponent},
  // { path: 'currency/:id', component: CurrencyDetailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}