import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpMePageRoutingModule } from './help-me-routing.module';

import { HelpMePage } from './help-me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpMePageRoutingModule
  ],
  declarations: [HelpMePage]
})
export class HelpMePageModule {}
