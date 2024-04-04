import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';


register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  dni: string = '';
  userValid: boolean = false;
  constructor( private storageSvc: StorageService, private router: Router ) {
  }

  exit(){
    this.storageSvc.clear();
    this.storageSvc.firstTime = true;
    this.router.navigate(['/']);
  }

  goMyAccount(){
    this.router.navigate(['my-account']);
  }

  goHelp(){
    this.router.navigate(['help-me']);
  }

  tersAndCond(){
    this.router.navigate(['termsandcond']);
  }

  privacy(){
    this.router.navigate(['privacy']);
  }

  aboutUs(){
    this.router.navigate(['about-us']);
  }

  async shareApp(){
    await Share.share({
      title: 'Comparte la App',
      text: '¡Hola! Si quieres acceder a promociones para diferentes tiendas tan solo tienes que descargarte la App QR SPORT y validar tu usuario. Si tienes Iphone pulsa aquí https://apps.apple.com/es/app/qr-sport/id6476313026?l=en-GB, si tienes Android aquí: https://play.google.com/store/apps/details?id=es.fabrikapps.qrsport. Gracias!',
      //url: 'http://ionicframework.com/',
      dialogTitle: 'Comparte con tus amigos',
    });
  }

}
