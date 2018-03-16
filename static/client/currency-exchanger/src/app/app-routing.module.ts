import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent }      from './wallets/wallets.component';
import { LoginComponent }      from './login/login.component';
// authenticate urls
import { AuthGuard } from './authentication/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/wallets', pathMatch: 'full' },
  { path: 'wallets', component: WalletsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}