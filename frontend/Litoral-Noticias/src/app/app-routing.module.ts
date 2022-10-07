import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './components/pages/home/home.component';

import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { WritterDashboardComponent } from './components/pages/writter-dashboard/writter-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { environment } from 'src/environments/environment';
import { WritterNoticesComponent } from './writter-notices/writter-notices.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"escritor", component:WritterDashboardComponent, canActivate:[AuthGuard], data:{roles:[environment.ROLE_WRITTER]}},
  {path:"escritor/minhas-noticias", component:WritterNoticesComponent, canActivate:[AuthGuard], data:{roles:[environment.ROLE_WRITTER]}}
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }