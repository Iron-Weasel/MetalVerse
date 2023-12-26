import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent {
    private httpService: BackendHttpService;
    public announcements: Announcement[];

    private announcementsObs: ReplaySubject<Announcement[]> = new ReplaySubject<Announcement[]>(1);  // send data
    public announcementsObs$ = this.announcementsObs.asObservable();  // receive data

    @ViewChild('searchInput') searchInputRef: ElementRef;
    

    constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.loadAnnouncements();

      this.httpService.announcementCreated$.subscribe(() => {
          this.loadAnnouncements();
      });
    }

    loadAnnouncements(): void {
      this.httpService.getAnnouncements().subscribe((data:Announcement[]) => {
          this.announcementsObs.next(data);
          this.announcements = data;
      });
    }

    searchAnnouncement(): void {
      if(this.searchInputRef.nativeElement.value == '') this.loadAnnouncements();
      else {
        this.httpService.searchAnnouncement(this.searchInputRef.nativeElement.value).subscribe((data:Announcement[]) => {
            this.announcementsObs.next(data);
            this.announcements = data;
        });
        this.searchInputRef.nativeElement.value = '';
      }
    }
}
