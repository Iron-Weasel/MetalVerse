import { Component } from '@angular/core';
import { FutureEvent } from 'src/app/models/future-event';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.css']
})
export class FutureEventsComponent {
  public events: FutureEvent[];
  
  constructor(httpService: BackendHttpService) { 
    httpService.getEvents().subscribe((data:FutureEvent[]) => {
       this.events= data;
    });
  }
}
