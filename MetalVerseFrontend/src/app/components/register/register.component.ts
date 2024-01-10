import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    selectedRole: string;
    isTermsSelected: boolean = false;
    isPasswordMatching: boolean = false;
    credentials: User = {
      firstName: '',
      lastName: '',
      email: '',
      username:'', 
      password:'',
      confirmPassword: '',
      userRole: ''
    };

    private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService, private router: Router) { 
      this.httpService  = httpService;
    }

    onSelected(value: string) {
      this.selectedRole = value;
    }

    // clicking on "Register" will create a new user
    public onSaveUser(form: NgForm): void {
      this.isPasswordMatching = this.checkPasswordsMatch();
      if(form.valid) {
        if(this.isTermsSelected && this.isPasswordMatching) {
          this.router.navigate(["/register-success"]);
          this.httpService.saveUser(this.credentials).subscribe((data:User) => { });
        }
        else this.router.navigate(["/register"]);
      }
    }

    acceptTerms(): void {
      this.isTermsSelected = true;
    }

    private checkPasswordsMatch(): boolean {
      return this.credentials.password === this.credentials.confirmPassword;
    }
  }
