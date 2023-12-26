import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FutureEvent } from 'src/app/models/future-event';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.css']
})

export class FutureEventsComponent {
    private httpService: BackendHttpService;
    public events: FutureEvent[];

    private eventsObs: ReplaySubject<FutureEvent[]> = new ReplaySubject<FutureEvent[]>(1);  // send data
    public eventsObs$ = this.eventsObs.asObservable();  // receive data

    @ViewChild('searchInput') searchInputRef: ElementRef;
    
    
    constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.loadEvents();

      this.httpService.eventCreated$.subscribe(() => {
          this.loadEvents();
      });
    }

    loadEvents(): void {
      this.httpService.getEvents().subscribe((data:FutureEvent[]) => {
        this.eventsObs.next(data);
        this.events= data;
      });
    }

    searchEvent(): void {
      if(this.searchInputRef.nativeElement.value == '') this.loadEvents();
      else {
        this.httpService.searchEvent(this.searchInputRef.nativeElement.value).subscribe((data:FutureEvent[]) => {
          this.eventsObs.next(data);
          this.events = data;
        });
        this.searchInputRef.nativeElement.value = '';
      }
    }
}
