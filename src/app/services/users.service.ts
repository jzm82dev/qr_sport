import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, RespUser } from '../interfaces';

const urlUsers = environment.urlUser;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  query: string = ''; 
  httpOptions: any;
  
  constructor( private http: HttpClient) {}

  getUser() {
    this.query = urlUsers + '?function=users';
    return this.http.get<User[]>( this.query );
  }

  getUserByDNI( dni:string ) {
    this.query = urlUsers + '?function=exists_dni_user&dni=' + dni  ;
    return this.http.get<RespUser>( this.query );
  }
}
