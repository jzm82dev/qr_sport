import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialSlidesPageRoutingModule } from './initial-slides-routing.module';

import { InitialSlidesPage } from './initial-slides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialSlidesPageRoutingModule
  ],
  declarations: [InitialSlidesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitialSlidesPageModule {}
