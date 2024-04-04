import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareAppPage } from './share-app.page';

const routes: Routes = [
  {
    path: '',
    component: ShareAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareAppPageRoutingModule {}
