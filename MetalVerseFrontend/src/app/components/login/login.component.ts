import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/authenticatedResponse';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    invalidLogin: boolean;
    credentials: User = {username:'', password:''};

    constructor(private router: Router, private httpService: BackendHttpService) { }

    public login ( form: NgForm) {
      if (form.valid) {
        this.httpService.authUser(this.credentials).subscribe(
        {
            next: (response: AuthenticatedResponse) => {
              const token = response.token;
              console.log(token);
              localStorage.setItem("jwt", token); 
              this.invalidLogin = false; 
              this.router.navigate(["/forum"]);
            },
            error: (err: HttpErrorResponse) => this.invalidLogin = true
        });
      }
    }
}
