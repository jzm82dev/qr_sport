import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpMePage } from './help-me.page';

const routes: Routes = [
  {
    path: '',
    component: HelpMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpMePageRoutingModule {}
