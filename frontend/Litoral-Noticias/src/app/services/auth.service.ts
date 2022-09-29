import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged!:boolean 

  public setToken(token:string){
    localStorage.setItem("token", token);
  }

  public getToken(){
    return localStorage.getItem("token")
  }

  public setRole(role:any){
    localStorage.setItem("role", role)
  }

  public getRole(){
    return localStorage.getItem("role")?.toString()
  }
  public clear(){
    localStorage.clear()
  }

  public isLoggedIn(){
    return this.getToken() ? true :false
  }

  public roleMatch(allowedRoles:Array<any>){
    let match = false
    const role = this.getRole()
    if(allowedRoles.includes(role)){
      match = true;
      return match
    }
    return match
  }


}
