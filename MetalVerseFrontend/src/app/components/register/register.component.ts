import { Component, ElementRef, ViewChild } from '@angular/core';
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
    inputCheck: boolean = false;
    routeCheck: boolean = false;
    errorMessage: string = '';
    @ViewChild('usernameInput') usernameInputRef: ElementRef;
    @ViewChild('firstNameInput') firstNameInputRef: ElementRef;
    @ViewChild('lastNameInput') lastNameInputRef: ElementRef;
    @ViewChild('emailInput') emailInputRef: ElementRef;
    @ViewChild('passwordInput') passwordInputRef: ElementRef;
    @ViewChild('confirmInput') confirmInputRef: ElementRef;

    private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService) { 
      this.httpService  = httpService;
    }

    onSelected(value: string) {
      this.selectedRole = value;
    }

    // clicking on "Register" will create a new user
    //TO THINK FURTHER OF A BETTER VALIDATION
    onSaveUser(): void {
      const user: User = {
        username: this.usernameInputRef.nativeElement.value,
        firstName: this.firstNameInputRef.nativeElement.value,
        lastName: this.lastNameInputRef.nativeElement.value,
        email: this.emailInputRef.nativeElement.value,
        password: this.passwordInputRef.nativeElement.value,
        userRole: this.selectedRole
      }  

      const isEmpty = Object.values(user).some(x => x == null || x == '' || x == undefined);
      if(isEmpty) {
        this.errorMessage = "All fields are mandatory!";
        this.inputCheck = false;
      }
      else {
        const confirmPassWord = this.confirmInputRef.nativeElement.value;
        if(confirmPassWord != this.passwordInputRef.nativeElement.value) {
          this.errorMessage = "Passwords do not match!";
          this.inputCheck = false;
        }
        else this.inputCheck = true;
      }

      if(!this.isTermsSelected) {
        this.errorMessage = "You must check this box!";
        this.inputCheck = false;
      }

      if(this.isTermsSelected && this.inputCheck){
        this.routeCheck = true;
        this.httpService.saveUser(user).subscribe((data:User) => { });
      }
    }

    acceptTerms(): void {
      this.isTermsSelected = true;
    }
  }
