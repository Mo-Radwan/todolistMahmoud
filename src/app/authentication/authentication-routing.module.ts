import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationPage } from './authentication.page';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationPage
  },
  {
    path: 'recovery',
    loadChildren: () => import('./recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
