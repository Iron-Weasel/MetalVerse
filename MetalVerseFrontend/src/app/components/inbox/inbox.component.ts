import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@auth0/auth0-angular';
import { BackendHttpService } from 'src/app/services/backend.service';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {
    connection: any;
    token:any;
    constructor( private router: Router, private httpService: BackendHttpService, private jwtHelper: JwtHelperService) {
      this.token = localStorage.getItem("jwt");
      this.connection = new signalR.HubConnectionBuilder()
                  .withUrl("https://localhost:7206/hub", { accessTokenFactory: () => this.token })
                  .build();
      this.connection
                  .start()
                  .then(() => console.log('Connection started'))
                  .catch((err: string) => console.log('Error while starting connection: ' + err))
    }
}
