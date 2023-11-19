import { Component } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  public announcements: Announcement[];

  constructor(httpService: BackendHttpService) { 
      httpService.getAnnouncements().subscribe((data:Announcement[]) => {
          this.announcements = data;
      });
  }
}
