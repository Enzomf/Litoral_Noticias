import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/userLogin-';
import { NgForm } from '@angular/forms';
import { NoticiasServiceService } from 'src/app/services/noticias.service.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public requestLogin!:UserLogin;

  constructor(private http:NoticiasServiceService , private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.requestLogin = new UserLogin();
  }

  doLogin(){
    this.http.login(this.requestLogin).subscribe((response)=>{console.log(response)}, (error)=>{this.messagesService.add(error.error.message)})


  }

}
