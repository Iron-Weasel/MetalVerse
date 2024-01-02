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
    dateEventMapText: { [eventId: string]: string} = {};
    
    
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
        this.events.forEach((event: FutureEvent) => {
          if(event.id != undefined) {
            if(event.eventTime != undefined) {
              this.dateEventMapText[event.id] = this.getDateTimeOfEvent(event.eventTime);
            }
          }
        });
      });
    }

    private getDateTimeOfEvent(dateTime: string): string {
      const formatString = dateTime.split("T");
      const date = formatString[0].split("-");
      const time = formatString[1].split(":", 2);
      
      const text = `${date[2]}.${date[1]}.${date[0]}, ${time[0]}:${time[1]}`;
      return text;
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
