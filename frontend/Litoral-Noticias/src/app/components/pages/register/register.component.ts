import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/User.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private messageservice: MessagesService,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(userData: any) {
    this.userservice.register(userData.value).subscribe(
      (response) => {
        this.authservice.setToken(response.token);
        this.authservice.setRole(response.token);
        this.userservice.getUserData()
        this.router.navigate(["/home"])
      },
      (error) => {
        this.messageservice.add(error.error.message);
      }
    );
  }
}
