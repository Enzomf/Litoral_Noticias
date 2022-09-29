import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import{ FormsModule} from "@angular/forms"

// Router 

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { WritterDashboardComponent } from './components/pages/writter-dashboard/writter-dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    MessagesComponent,
    WritterDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
