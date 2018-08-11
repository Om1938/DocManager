import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers } from '@angular/http'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = "http://10.2.0.197:3000";
  loggedIn = new BehaviorSubject<boolean>(this.isloggedIn());
  constructor(private http: HttpClient,private router :Router) { }

  loginUser(data) {
    if (data.userName !== '' && data.passWord !== '') {
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', `application/json`);
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      console.log(headers);
      return this.http.post(this.api + '/login', data, { headers:headers });
    }
  }
  pingServer(){
    this.http.get(this.api).subscribe((res:any)=>{
      console.log(res);
    })
  }
  private isloggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.loggedIn.next(false);
  };
}
