import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent }      from './wallets/wallets.component';
import { LoginComponent }      from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'wallets', component: WalletsComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}