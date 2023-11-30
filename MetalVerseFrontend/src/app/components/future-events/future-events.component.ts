import { Component, ElementRef, ViewChild } from '@angular/core';
import { FutureEvent } from 'src/app/models/future-event';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.css']
})
export class FutureEventsComponent {
  public events: FutureEvent[];

  @ViewChild('searchInput') searchInputRef: ElementRef;
  private httpService: BackendHttpService;
  
  constructor(httpService: BackendHttpService) { 
    this.httpService = httpService;
    this.httpService.getEvents().subscribe((data:FutureEvent[]) => {
       this.events= data;
    });
  }

  searchEvent(): void {
    this.httpService.searchEvent(this.searchInputRef.nativeElement.value).subscribe((data:FutureEvent[]) => {
      this.events = data;
    });
  }
}
