import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsPage } from './lists.page';

const routes: Routes = [
  {
    path: '',
    component: ListsPage,
  },
  {
    path: 'addlist',
    loadChildren: () => import('./addlist/addlist.module').then( m => m.AddlistPageModule)
  },
  {
    path: 'editlist',
    loadChildren: () => import('./editlist/editlist.module').then( m => m.EditlistPageModule)
  },
  {
    path: 'sharelist',
    loadChildren: () => import('./sharelist/sharelist.module').then( m => m.SharelistPageModule)
  },
  {
    path: 'showlist',
    loadChildren: () => import('./showlist/showlist.module').then( m => m.ShowlistPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsPageRoutingModule {}
