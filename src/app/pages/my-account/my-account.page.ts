import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { User } from '../../interfaces';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  dni: string = '';
  user!: User;
  userValid: number = 0;
  form!: NgForm;

  constructor( private storageSrv: StorageService, private userSrv: UsersService,
               private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.dni = await this.storageSrv.get('dni');
    if( this.dni ){
      this.userSrv.getUserByDNI( this.dni ).subscribe( resp => {
        if(resp.exists == true){
          this.userValid = 1;
          this.user = resp.user;
          console.log(this.user);
        }else{
          this.userValid = 2;
        }
      }
    )}else{
      this.userValid = 2;
    }
  }

  login(formulario: NgForm){
    this.dni = this.dni.toUpperCase();
    if( this.dni.length < 9){
      for (var x=this.dni.length; x<9; x++) 
	    {
		    this.dni = "0" + this.dni;
	    }
    }

    this.userSrv.getUserByDNI( this.dni ).subscribe( resp => {
      if(resp.exists == true){
        this.userValid = 1;
        this.user = resp.user;
        this.storageSrv.set('dni', this.dni);
      }else{
        this.userValid = 2;
        this.presentAlert(this.dni);
        return;
      }
    })

  }

  async presentAlert ( dni:string ) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR AL LOGEARTE',
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


}
