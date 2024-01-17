import { Component, ElementRef, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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
    enabled: boolean = false;
    

    constructor(httpService: BackendHttpService, private jwtHelper: JwtHelperService) { 
      this.httpService = httpService;
      this.loadAnnouncements();

      this.httpService.announcementCreated$.subscribe(() => {
          this.loadAnnouncements();
      });
      this.getUserLoggedIn();
    }

    private getUserLoggedIn() {
      const token = localStorage.getItem("jwt");
      if(token) {
        var decodedToken = this.jwtHelper.decodeToken(token);
        if(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'Band Member' || 
           decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'Studio Manager')  {
               this.enabled = true;
           }
      }
    }

    private loadAnnouncements(): void {
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
