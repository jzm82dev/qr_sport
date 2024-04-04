import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialSlidesPage } from './initial-slides.page';

const routes: Routes = [
  {
    path: '',
    component: InitialSlidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialSlidesPageRoutingModule {}
