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
      //TODO: set event data from backend, based on frontend input
      //for now, change the ID each time
      const futureEvent: FutureEvent = {
        id: "345bf360-aef9-4641-a21b-38b452972a14",
        title: this.titleInputRef.nativeElement.value,
        bandCountry: this.bandCountryInputRef.nativeElement.value,
        bandGenre: this.bandGenreInputRef.nativeElement.value,
        country: this.countryInputRef.nativeElement.value,
        city: this.cityInputRef.nativeElement.value,
        venueName: this.venueInputRef.nativeElement.value,
        eventTime: "2023-11-15T19:57:14.693Z"
      }
      this.httpService.saveEvent(futureEvent).subscribe((data:FutureEvent) => { });
  }
}