import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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

    constructor(private router: Router, private httpService: BackendHttpService, private jwtHelper: JwtHelperService) { }

    public login ( form: NgForm) {
      if (form.valid) {
        this.httpService.authUser(this.credentials).subscribe(
        {
            next: (response: AuthenticatedResponse) => {
              const token = response.token;
              localStorage.setItem("jwt", token); 
              this.invalidLogin = false; 
              const decodedToken = this.jwtHelper.decodeToken(token);
              const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
              this.roleBasedRouting(role);
            },
            error: (err: HttpErrorResponse) => this.invalidLogin = true
        });
      }
    }

    private roleBasedRouting(role: string) {
      switch(role) {
        case 'Regular User': this.router.navigate(["/forum"]); break;
        case 'Band Member': this.router.navigate(["/announcements"]); break;
        case 'Event Organizer': this.router.navigate(["/events"]); break;
        case 'Studio Manager': this.router.navigate(["/announcements"]); break;
      }
    }
}
