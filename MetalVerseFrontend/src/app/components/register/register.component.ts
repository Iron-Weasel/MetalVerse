import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    //TODO: would be nicer to use FormsModel next time
    @ViewChild('usernameInput') usernameInputRef: ElementRef;
    @ViewChild('firstNameInput') firstNameInputRef: ElementRef;
    @ViewChild('lastNameInput') lastNameInputRef: ElementRef;
    @ViewChild('emailInput') emailInputRef: ElementRef;
    @ViewChild('passwordInput') passwordInputRef: ElementRef;

    private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService) { 
      this.httpService  = httpService;
    }

    // clicking on "Register" will create a new user
    onSaveUser(): void {
        //TODO: set user data from backend, based on frontend input
        //for now, change the ID
        //there is also an issue with the model on BE (user role)
        const user: User = {
          id: "3ae9ce44-1631-4dfb-b1bc-b5a11051c9b6",
          username: this.usernameInputRef.nativeElement.value,
          firstName: this.firstNameInputRef.nativeElement.value,
          lastName: this.lastNameInputRef.nativeElement.value,
          email: this.emailInputRef.nativeElement.value,
          password: this.passwordInputRef.nativeElement.value,
        }
        this.httpService.saveUser(user).subscribe((data:User) => { });
    }
  }
