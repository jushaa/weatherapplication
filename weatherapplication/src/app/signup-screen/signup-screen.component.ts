import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('email') === null) {} else {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form: NgForm){

    const email = form.value.email;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.signUp(email , username, password);
  }

}
