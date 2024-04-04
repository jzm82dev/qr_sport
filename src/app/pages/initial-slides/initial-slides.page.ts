import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-initial-slides',
  templateUrl: './initial-slides.page.html',
  styleUrls: ['./initial-slides.page.scss'],
})
export class InitialSlidesPage {

  dni: string = '';
  firstTime: boolean = false;

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/images/img_2.png',
      titulo: 'CREA TU CÓDIGO QR',
      desc: 'Introduce tu DNI para generar tu código QR personal para validarlo. Una vez validado tendrás derecho a las ofertas de las tiendas adheridas'
    },
    {
      img: '/assets/images/img_1.png',
      titulo: 'COMPRUEBA EL CÓDIGO QR',
      desc: 'Comprueba el código QR que te proporcione el cliente para hacerle la oferta de tu tienda'
    },
    {
      img: '/assets/images/img_3.png',
      titulo: 'TIENDAS CON OFERTAS',
      desc: 'Comprueba todos los días el listado de tiendas que tenemos actualmente con promociones.'
    }
  ];

  constructor(private router: Router, private storageSrv: StorageService, private menuCtrl: MenuController) {
  }


  async ionViewWillEnter(){
    this.firstTime = await this.storageSrv.get('firstTime');
    if(this.firstTime == false){
      this.storageSrv.isFirstTimeLoad();
      this.router.navigate(['/tabs']);
    }else{ 
      this.storageSrv.set('firstTime', false) ;
      this.firstTime = true;
      this.menuCtrl.enable(false);
    }
  }



  comenzar(){
    this.menuCtrl.enable(true);
    this.storageSrv.saveFirstTimeLoad();
    //this.storageSrv.isFirstTimeLoad();
    //this.navCtrl.navigateRoot('jorge');
    this.router.navigate(['/tabs']);
  }

}
