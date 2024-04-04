import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { StorageService } from './services/storage.service';
import { toBuffer } from 'qrcode';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/initial-slides/initial-slides.module').then( m => m.InitialSlidesPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'termsandcond',
    loadChildren: () => import('./pages/termsandcond/termsandcond.module').then( m => m.TermsandcondPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'help-me',
    loadChildren: () => import('./pages/help-me/help-me.module').then( m => m.HelpMePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'share-app',
    loadChildren: () => import('./pages/share-app/share-app.module').then( m => m.ShareAppPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./pages/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 

  constructor( private storageSrv: StorageService){
  }

 

}




