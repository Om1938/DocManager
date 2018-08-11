import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegComponent } from './reg/reg.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main/main.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtInterceptor } from './jwtInterceptor';
import { ErrorInterceptor } from './error.Interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RegComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegComponent },
      { path: '', component: MainComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
