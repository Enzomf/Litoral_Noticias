import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router} from "@angular/router";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth:AuthService, private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken()


    const authReq = req.clone({headers: req.headers.set('Authorization', `BEARER ${authToken}`)})
    
    return next.handle(authReq);

    }
}