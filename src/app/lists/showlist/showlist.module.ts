import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowlistPageRoutingModule } from './showlist-routing.module';

import { ShowlistPage } from './showlist.page';
import { SharinglistComponent } from '../sharelist/sharinglist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowlistPageRoutingModule,
    SharinglistComponent
  ],
  declarations: [ShowlistPage],
  entryComponents:[SharinglistComponent]
})
export class ShowlistPageModule {}
