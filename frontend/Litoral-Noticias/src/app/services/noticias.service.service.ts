import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import  { Observable, catchError } from "rxjs"
import { environment } from 'src/environments/environment';
import { UserLogin } from '../Models/userLogin-';
import { ResponseLogin } from '../Models/responseLogin';



@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {

  constructor(private http:HttpClient) { }

  private url = `${environment.baseUrl}/auth` 
  
  login(userData:UserLogin ):Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}/login`, userData)

  }
  
}
