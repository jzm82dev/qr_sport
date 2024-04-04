import { Component, OnInit,ViewChild } from '@angular/core';
import { ShopsService } from '../../services/shops.service';
import { Shop, User } from '../../interfaces';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  @ViewChild( IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  loaded: boolean = false;
  shops: Shop[] = [];
  searchText: string = '';
  dni: string = '';
  user!: User;
  userValid: number = 0;
  form!: NgForm;

  constructor( private shopSrv: ShopsService, private userSrv: UsersService, private storageSrv: StorageService,
               private alertCtrl: AlertController) {}

  async ionViewWillEnter(){
    this.dni = await this.storageSrv.get('dni');
    if( this.dni ){
      this.shops = [];
      this.userValid = 1;
      this.getShops();
    }else{
      this.userValid = 2;
    }
  }

  async ngOnInit() {
    this.dni = await this.storageSrv.get('dni');
    if( this.dni ){
      this.userValid = 1;
    }else{
      this.userValid = 2;
    }
  }

  async getShops(){
    this.shopSrv.getNewsByCategories(true).subscribe( ( shops) => {
      console.log('Shops onInit',shops)
      this.loaded = true;
      if(shops.length<10){
        this.infiniteScroll.disabled = true;
      }
      this.shops.push(...shops);
    })
  }

  loadMoreData(){
    this.shopSrv.getNewsByCategories(true).subscribe( items => {
      this.shops = items;
      if(this.shops.length == items.length){
        this.infiniteScroll.disabled = true;
        return; 
      }
      this.infiniteScroll.complete();
        //event.target.complete();
      
    })
  }
  

  onSearchChange( event:any ){
    this.searchText = event.detail.value;
  }

  handleRefresh( event:any ){
    setTimeout(() => {
      this.shops = [];
      this.shopSrv.inicializeData();
      this.ngOnInit();
  
      event.target.complete();
    }, 2000);
    
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
        this.getShops();
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
