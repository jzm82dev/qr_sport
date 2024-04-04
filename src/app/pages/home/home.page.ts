import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dni: string = '';
  firstTime!: boolean;

  constructor(private router: Router, private storageSrv: StorageService) { }

  /*
  ngOnInit() {
    this.firstTime = this.storageSrv.firstTime;  

    //if first time update first time 
    if(this.firstTime == false){
      console.log('entramos')
      this.storageSrv.saveFirstTimeLoad();
    }
  }

  */

  async ngOnInit() {
    this.dni = await this.storageSrv.get('dni');
    console.log(this.dni)
    if( this.dni ){
      console.log('entramos inf')
      this.router.navigate(['/'])
    }else{
      console.log('entramos else')
      this.router.navigate(['/initial-slides'])
    }
  }

/*
  async functionOnWhichRedirectShouldHappen(){
    //this.dni = await this.storageSrv.get('dni');
    console.log(this.dni)
     if( this.dni ){
      console.log('entramos if')
      this.router.navigate(['']);
    }else{
      console.log('entramos else')
      this.router.navigate(['/initial-slides']);
     }
  }
  */

}
