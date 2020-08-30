import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';

import { ListsPageRoutingModule } from './lists-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPageRoutingModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
