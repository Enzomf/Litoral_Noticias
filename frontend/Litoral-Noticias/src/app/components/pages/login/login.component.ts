import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/userLogin-';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/User.service.service';
import { MessagesService } from 'src/app/services/messages.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  public requestLogin!: UserLogin;
  public userData!: UserLogin

  

  constructor(
    private http: UserService,
    private messagesService: MessagesService,
    private authservice: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.requestLogin = new UserLogin();
  }

  doLogin(formData:any) {
    this.http.login(formData.value).subscribe(response => {
      this.authservice.setRole(response.role)
      this.authservice.setToken(response.token)

      this.http.getUserData()

      if(response.role == environment.ROLE_WRITTER){
        this.router.navigate(["/escritor"])
      }else if(response.role == environment.ROLE_READER){
        this.router.navigate(["/home"])
      }else if(response.role == environment.ROLE_ADMIN){
        this.router.navigate(["/admin"])
      }
    }, error=>{
      this.messagesService.add(error.error.message)
    })
 
  }
}
