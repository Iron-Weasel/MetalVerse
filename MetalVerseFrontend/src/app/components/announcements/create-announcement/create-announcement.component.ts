import { Component, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-announcements',
  templateUrl: './create-announcements.component.html',
  styleUrls: ['./create-announcements.component.css']
})
export class CreateAnnouncementsComponent {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef: ElementRef;

  private httpService: BackendHttpService;
  userIdLoggedIn: string;

  constructor(httpService: BackendHttpService, private jwtHelper: JwtHelperService) { 
    this.httpService  = httpService;
    this.getUserLoggedIn();
  }

  getUserLoggedIn() {
    const token = localStorage.getItem("jwt");
    if(token) var decodedToken = this.jwtHelper.decodeToken(token);
    this.userIdLoggedIn = decodedToken['nameid'];
  }
  

  // clicking on "Post" will create a new announcement
  onSaveAnnouncement(): void {
      const announcement: Announcement = {
        userId: this.userIdLoggedIn,
        title: this.titleInputRef.nativeElement.value,
        description: this.descriptionInputRef.nativeElement.value,
        image: "some image"
      }
      this.httpService.saveAnnouncement(announcement).subscribe((data:Announcement) => { });
  }
}