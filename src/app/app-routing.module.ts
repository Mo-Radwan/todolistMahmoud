import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then(m => m.ListsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
