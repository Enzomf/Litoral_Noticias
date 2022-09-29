import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../services/User.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles = environment;

  constructor(
    private route: Router,
    public authservice: AuthService,
    private userService: UserService
  ) {}

  isAuthtenticated!: boolean;
  userData?: any;

  ngOnInit(): void {
  
      this.userService.getUserData().subscribe((response) => {
        this.userData = response.message;
      });

  }

  loginRedirect() {
    this.route.navigateByUrl('/login');
  }
  isLogged() {
    return this.authservice.isLoggedIn();
  }

  checkRole() {
    return this.authservice.getRole();
  }
  logout() {
    this.authservice.clear();
  }
}
