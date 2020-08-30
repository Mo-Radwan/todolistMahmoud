import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharelistPage } from './sharelist.page';

const routes: Routes = [
  {
    path: '',
    component: SharelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharelistPageRoutingModule {}
