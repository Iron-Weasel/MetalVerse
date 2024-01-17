import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewAnnouncementComponent { 
  private httpService: BackendHttpService;
  public announcement: Announcement;
  private idAnnouncement: string;

  usernameMap: { [userId: string]: string } = {};

  constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
    this.httpService = httpService;
    this.idAnnouncement = String(this.route.snapshot.paramMap.get('id'));
    this.httpService.getAnnouncement(this.idAnnouncement).subscribe((data:Announcement) => {
        this.announcement = data;
        this.httpService.getUser(this.announcement.userId).subscribe((data: User) => {
          this.usernameMap[this.announcement.userId] = data.username;
        });
    });
  }
}