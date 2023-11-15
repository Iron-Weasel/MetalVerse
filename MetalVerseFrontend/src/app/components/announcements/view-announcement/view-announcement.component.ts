import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewAnnouncementComponent { 
  public announcement: Announcement;
  public idAnnouncement: string;

  constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
    this.idAnnouncement = String(this.route.snapshot.paramMap.get('id'));
    httpService.getAnnouncement(this.idAnnouncement).subscribe((data:Announcement) => {
        this.announcement = data;
    });
  }
}