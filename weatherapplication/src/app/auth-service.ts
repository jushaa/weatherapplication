import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService{

  constructor(private router: Router, private httpClient: HttpClient){

  }
  signUp(email: string, username: string, password: string){

    const url = "http://127.0.0.1:5000/makeUser";
    sessionStorage.setItem('email', email);

    return this.httpClient.post(url, {email:email, username:username,password:password}, { responseType: 'text' }).subscribe(
      res =>  this.nextScreen(res) );
  }
  login(email: string, password: string){

    const url = "http://127.0.0.1:5000/Authenticate";
    sessionStorage.setItem('email', email);

    return this.httpClient.post(url, {email:email,password:password}, { responseType: 'text' }).subscribe(
      res =>  this.nextScreen(res) );

  }
  getUser(){
    const url = "http://127.0.0.1:5000/getUser";
    var email = sessionStorage.getItem('email');
    return this.httpClient.post(url, {email: email}, {responseType: 'text'}).toPromise()

  }
  nextScreen(res){
    if(res === "Logged in successfully"){
      this.router.navigate(['/home']);
    }else{
      //TODO: handel error
      console.log("error")
    }
  }
}

