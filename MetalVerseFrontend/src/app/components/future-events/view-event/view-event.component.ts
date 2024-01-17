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
  private idEvent: string;
  
  constructor(private route: ActivatedRoute, httpService: BackendHttpService) { 
    this.idEvent = String(this.route.snapshot.paramMap.get('id'));
    httpService.getEvent(this.idEvent).subscribe((data:FutureEvent) => {
       this.event= data;
    });
  }

  openLink(url: string | undefined) {
    console.log(url);
    if(url != undefined) window.open(url, '_system');
  }
}
