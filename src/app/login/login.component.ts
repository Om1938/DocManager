import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User("","");
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  login(){
      this.auth.loginUser(this.user).subscribe((res:any)=>{
        console.log(res);
        if(res.token){
          this.auth.loggedIn.next(true);
          localStorage.setItem('token',res.token);
        }        
      });
  }

  
}
