import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  firstTime!: boolean;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    const storage = await this.storage.create();
    this._storage = storage;
    this.isFirstTimeLoad();
  }

  public async set( key:string, value:any){
    let result = await this._storage?.set(key, value);
    console.log('dni:',result);
  }

  public async get( key:string ){
    let value = this._storage?.get(key);
    console.log(value);
    return value;
  }

  public async remove( key:string ){
    let value = this._storage?.remove(key);
  } 

  public async clear(){
    this._storage?.clear();
  }

  public async keys(){
    let value = await this._storage?.keys();
    return value;
  }

  public getTest( key: string){
    let value = this._storage?.get(key);
    return value;
  }

  getDNI(key: string ): string {

    this._storage?.get(key).then((res) => {
      return res || '';
    });
    return '';
  }

  isFirstTimeLoad(): void {
    this.storage.get("firstTime").then((result) => {
      if (result == false) {
        this.firstTime = false;
        this.storage.set('firstTime', false);
      }
      else {
        this.firstTime = true;
        this.storage.set('firstTime', true);
      }
    })
  }

  saveFirstTimeLoad(): void {
    this.storage.set('firstTime', false);
  }

}
