import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsPage } from './items.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {
    path: 'additem',
    loadChildren: () => import('./additem/additem.module').then( m => m.AdditemPageModule)
  },
  {
    path: 'edititem',
    loadChildren: () => import('./edititem/edititem.module').then( m => m.EdititemPageModule)
  },
  {
    path: 'showitem',
    loadChildren: () => import('./showitem/showitem.module').then( m => m.ShowitemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsPageRoutingModule {}
