import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FutureEvent } from 'src/app/models/future-event';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {
  public event: FutureEvent;
  public idEvent: string;

  dateEventMapText: { [eventId: string]: string} = {};
  
  constructor(private route: ActivatedRoute, httpService: BackendHttpService) { 
    this.idEvent = String(this.route.snapshot.paramMap.get('id'));
    httpService.getEvent(this.idEvent).subscribe((data:FutureEvent) => {
       this.event= data;
       if(this.event.id != undefined) {
        if(this.event.eventTime != undefined) {
          this.dateEventMapText[this.event.id] = this.getDateTimeOfEvent(this.event.eventTime);
        }
      }
    });
  }

  private getDateTimeOfEvent(dateTime: string): string {
    const formatString = dateTime.split("T");
    const date = formatString[0].split("-");
    const time = formatString[1].split(":", 2);
    
    const text = `${date[2]}.${date[1]}.${date[0]}, ${time[0]}:${time[1]}`;
    return text;
  }

  openLink(url: string | undefined) {
    console.log(url);
    if(url != undefined) window.open(url, '_system');
  }
}
