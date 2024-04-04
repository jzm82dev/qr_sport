import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  show_hidden='';
  scannedResult: any;
  isSupported = false;
  existsUser: Number = 0;
  user!: User;
  textButton: string = 'ESCANEAR CÓDIGO';
  

  constructor( private alertController: AlertController, private userSrv: UsersService) {
  }

  ngOnInit(): void {
    this.existsUser = 0;
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  

  async checkPermission(){
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    
  }

  async startScan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    if( barcodes ){
      this.scannedResult = barcodes[0].rawValue;
      this.userSrv.getUserByDNI( this.scannedResult ).subscribe( resp => {
        if(resp.exists == true){
          this.existsUser = 1;
          this.user = resp.user;
        }else{
          this.textButton = 'VOLVER ESCANEAR CÓDIGO';
          this.existsUser = 2;
          return;
        }
      })
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, da permiso a QR SPORT para poder utilizar la cámara. Así podrás escanear códigos QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    BarcodeScanner.stopScan();
  }



}
