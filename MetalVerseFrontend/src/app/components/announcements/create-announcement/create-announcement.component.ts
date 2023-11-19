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
      //TODO: set announcements data from backend, based on frontend input
      //for now, change the IDs
      const announcement: Announcement = {
        id: "75f1c9dc-f63c-4608-86f6-455253970d35",
        userId: "ed519956-e527-415b-8c29-e8ee76f4bca6",
        title: this.titleInputRef.nativeElement.value,
        description: this.descriptionInputRef.nativeElement.value,
        image: "some image"
      }
      this.httpService.saveAnnouncement(announcement).subscribe((data:Announcement) => { });
  }
}