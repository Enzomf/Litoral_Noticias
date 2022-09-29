import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import  { Observable, catchError } from "rxjs"
import { environment } from 'src/environments/environment';
import { UserLogin } from '../Models/userLogin-';
import { ResponseLogin } from '../Models/responseLogin';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private url = `${environment.baseUrl}` 
  
  login(userData:FormData ):Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/auth/login`, userData)
  }

  getUserData():Observable<any>{
    return this.http.get<any>(`${this.url}/user/profile`)
  }

  register(userData:FormData):Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/auth/register`,userData )
  }
  
}
