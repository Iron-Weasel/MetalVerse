import { Component, ElementRef, ViewChild } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  public announcements: Announcement[];

  @ViewChild('searchInput') searchInputRef: ElementRef;
  private httpService: BackendHttpService;

  constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.httpService.getAnnouncements().subscribe((data:Announcement[]) => {
          this.announcements = data;
      });
  }

  searchAnnouncement(): void {
    this.httpService.searchAnnouncement(this.searchInputRef.nativeElement.value).subscribe((data:Announcement[]) => {
      this.announcements = data;
    });
  }
}
