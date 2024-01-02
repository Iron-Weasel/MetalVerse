import { Component, ViewChild, ElementRef } from '@angular/core';
import { FutureEvent } from 'src/app/models/future-event';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  //TODO: would be nicer to use FormsModel next time
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('bandCountryInput') bandCountryInputRef: ElementRef;
  @ViewChild('bandGenreInput') bandGenreInputRef: ElementRef;
  @ViewChild('countryInput') countryInputRef: ElementRef;
  @ViewChild('cityInput') cityInputRef: ElementRef;
  @ViewChild('venueInput') venueInputRef: ElementRef;
  @ViewChild('timeInput') timeInputRef: ElementRef;

  private httpService: BackendHttpService;

  constructor(httpService: BackendHttpService) { 
    this.httpService  = httpService;
  }

  // clicking on "Post" will create a new event
  onSaveEvent(): void {
      const newEventTime = this.eventTimeToBeSent(this.timeInputRef.nativeElement.value);

      const futureEvent: FutureEvent = {
        title: this.titleInputRef.nativeElement.value,
        bandCountry: this.bandCountryInputRef.nativeElement.value,
        bandGenre: this.bandGenreInputRef.nativeElement.value,
        country: this.countryInputRef.nativeElement.value,
        city: this.cityInputRef.nativeElement.value,
        venueName: this.venueInputRef.nativeElement.value,
        eventTime: newEventTime
      }
      this.httpService.saveEvent(futureEvent).subscribe((data:FutureEvent) => { });
  }

  // format the eventTime string, so it can be stored and processed on backend & database
  private eventTimeToBeSent(dateTime: string): string {
    const formatString = dateTime.split(",");
    const date = formatString[0].split(".");
    const time = formatString[1].trim();

    const newEventTime = `${date[2]}-${date[1]}-${date[0]}T${time}:00.600Z`;
    return newEventTime;
  }
}