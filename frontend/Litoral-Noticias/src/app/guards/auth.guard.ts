import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice : AuthService, private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authservice.getToken() !== null){
        const role = route.data["roles"] as Array<string>

        if(role){
          const math = this.authservice.roleMatch(role);
          console.log(role)
          if(math){
            return true
          }else{
            this.router.navigate(["/login"])
            return false
          }
        }
      }

      this.router.navigate(["/login"])
      return false;
  }
  
}
