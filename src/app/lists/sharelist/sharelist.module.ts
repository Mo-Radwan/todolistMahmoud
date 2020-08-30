import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharelistPageRoutingModule } from './sharelist-routing.module';

import { SharelistPage } from './sharelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharelistPageRoutingModule
  ],
  declarations: [SharelistPage]
})
export class SharelistPageModule {}
