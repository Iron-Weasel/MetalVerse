import { Component, ViewChild, ElementRef } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-announcements',
  templateUrl: './create-announcements.component.html',
  styleUrls: ['./create-announcements.component.css']
})
export class CreateAnnouncementsComponent {
  //TODO: would be nicer to use FormsModel next time
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef: ElementRef;

  private httpService: BackendHttpService;

  constructor(httpService: BackendHttpService) { 
    this.httpService  = httpService;
  }

  // clicking on "Post" will create a new announcement
  onSaveAnnouncement(): void {
      const announcement: Announcement = {
        userId: "715a5636-51bc-4a12-a961-a425750d398c",
        title: this.titleInputRef.nativeElement.value,
        description: this.descriptionInputRef.nativeElement.value,
        image: "some image"
      }
      this.httpService.saveAnnouncement(announcement).subscribe((data:Announcement) => { });
  }
}