import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, MenuController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces';
import { StorageService } from '../../services/storage.service';
import { AppComponent } from '../../app.component';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{


  show_hidden='';
  qrString = ''
  scannedResult: any;
  qr_generated:boolean = false;
  dni: string = '';
  user!: User;
  form!: NgForm;


  constructor( private userSrv: UsersService, private alertCtrl: AlertController,
               private storageSrv: StorageService, private menuCtrl: MenuController) {  
  }

  async ionViewWillEnter(){
    this.dni = await this.storageSrv.get('dni');
     if( this.dni ){
      this.createQR(this.form);
     }
  }

  async ngOnInit() {
    console.log('pasamos')
     this.dni = await this.storageSrv.get('dni');
     if( this.dni ){
      this.createQR(this.form);
     }
  }
  
  createQR(formulario: NgForm){
    this.dni = this.dni.toUpperCase();
    if( this.dni.length < 9){
      for (var x=this.dni.length; x<9; x++) 
	    {
		    this.dni = "0" + this.dni;
	    }
    }
    
    this.userSrv.getUserByDNI( this.dni ).subscribe( resp => {
      if(resp.exists == true){
        this.user = resp.user;
        this.qr_generated = true;
        this.qrString = this.dni;
        this.storageSrv.set('dni', this.dni);
      }else{
        this.presentAlert(this.dni);
        return;
      }
    })

    
  }
 

  async presentAlert ( dni:string ) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR AL CREAR QR',
      message: `El DNI ${dni} no está activo en nuestros sistemas`,
      buttons: [
        {
          text: 'OK',
          handler: ()=> {
            this.dni = '';
          } 
        }
      ],
    });

    await alert.present();
  }

  showMenu(){
    this.menuCtrl.open('first')
  }
  /*
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor( private alertController: AlertController ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  */
  /*
  async startScanner(){
    console.log('Pasamos')
    const allowed = await this.checkPermission();
    if(allowed){
      const result = await BarcodeScanner.startScan();
      console.log(result)
    }
    
    
  };

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermissions(); 
      console.log('Resolvee', status)
      if(status.camera == 'granted'){
        console.log('todo bien')
        resolve(true);
      }else if(status.camera == 'denied'){
        
      }else{
        resolve(false);
      }
    })
    console.log('Entramos')
    
    console.log('Status:', status)
    return status;
  }
  
  */

}
