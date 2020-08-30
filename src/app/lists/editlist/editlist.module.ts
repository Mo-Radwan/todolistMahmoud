import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditlistPageRoutingModule } from './editlist-routing.module';

import { EditlistPage } from './editlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditlistPageRoutingModule
  ],
  declarations: [EditlistPage]
})
export class EditlistPageModule {}
