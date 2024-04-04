import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Shop, respShop, shopByPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

const urlShops = environment.urlShop;

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  query: string = ''; 
  private shopsByPage: shopByPage = { page : 0, shops: [] }

  constructor( private http:HttpClient ) { }

  getShops(){
    this.query = urlShops + '?function=all';
    return this.http.get<respShop>( this.query );
  }


  getNewsByCategories(loadMore: boolean = false ): Observable<Shop[]>{
    if(loadMore){
      return this.getShopsByPage();
    }

    if( this.shopsByPage){
      return of(this.shopsByPage.shops);
    }

    return this.getShopsByPage();

  }

  private executeQuery<T>( endpoint: string){
    console.log('Peticion HTTP Realizada', endpoint);
    return this.http.get<T>(`${ urlShops }${ endpoint }`)
  }


  private getShopsByPage():Observable<Shop[]>{
    console.log('pasamos')
    if(this.shopsByPage.shops.length > 0){
      //this.articleByCategoryAndPage[category].page += 1;
    }else{
      console.log('new page')
      this.shopsByPage = {
        page: 0,
        shops: []
      }
    }
    
      const constPage = this.shopsByPage.page += 1;
      return this.executeQuery<respShop>(`?function=getByPage&page=${ constPage }`).
              pipe( 
                map( resp => {
                  if(resp.shops.length == 0){
                    return this.shopsByPage.shops;
                  }
                  this.shopsByPage = {
                    page: constPage,
                    shops: [...this.shopsByPage.shops, ...resp.shops]
                  }

                  return this.shopsByPage.shops;
                })
              )
    
  }

  inicializeData(){
    this.shopsByPage.shops = [];
    this.shopsByPage.page = 0;
  }
}
