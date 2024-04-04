import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareAppPageRoutingModule } from './share-app-routing.module';

import { ShareAppPage } from './share-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareAppPageRoutingModule
  ],
  declarations: [ShareAppPage]
})
export class ShareAppPageModule {}
