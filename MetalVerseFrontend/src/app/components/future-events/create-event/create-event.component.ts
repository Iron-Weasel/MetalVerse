import { Component, ViewChild, ElementRef } from '@angular/core';
import { FutureEvent } from 'src/app/models/future-event';
import { AzureStorageService } from 'src/app/services/azure-storage.service';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('bandCountryInput') bandCountryInputRef: ElementRef;
  @ViewChild('bandGenreInput') bandGenreInputRef: ElementRef;
  @ViewChild('fbInput') fbInputRef: ElementRef;
  @ViewChild('wikiInput') wikiInputRef: ElementRef;
  @ViewChild('bandPageInput') bandPageInputRef: ElementRef;
  @ViewChild('ticketInput') ticketInputRef: ElementRef;
  @ViewChild('countryInput') countryInputRef: ElementRef;
  @ViewChild('cityInput') cityInputRef: ElementRef;
  @ViewChild('stateInput') stateInputRef: ElementRef;
  @ViewChild('countyInput') countyInputRef: ElementRef
  @ViewChild('venueInput') venueInputRef: ElementRef;
  @ViewChild('timeInput') timeInputRef: ElementRef;

  private httpService: BackendHttpService;

  constructor(httpService: BackendHttpService, private azureService: AzureStorageService) { 
    this.httpService  = httpService;
  }

  // clicking on "Post" will create a new event
  onSaveEvent(): void {
      const newEventTime = this.eventTimeToBeSent(this.timeInputRef.nativeElement.value); 
      const stateValue = this.stateInputRef.nativeElement.value ? this.stateInputRef.nativeElement.value : "";
      const countyValue = this.countyInputRef.nativeElement.value ? this.countyInputRef.nativeElement.value : "";
      const wikiValue = this.wikiInputRef.nativeElement.value ? this.wikiInputRef.nativeElement.value : "";
      const bandPageValue = this.bandPageInputRef.nativeElement.value ? this.bandPageInputRef.nativeElement.value : "";

      const futureEvent: FutureEvent = {
        title: this.titleInputRef.nativeElement.value,
        bandCountry: this.bandCountryInputRef.nativeElement.value,
        bandGenre: this.bandGenreInputRef.nativeElement.value,
        country: this.countryInputRef.nativeElement.value,
        state: stateValue,
        county: countyValue,
        city: this.cityInputRef.nativeElement.value,
        venueName: this.venueInputRef.nativeElement.value,
        eventTime: newEventTime,
        facebookPage: this.fbInputRef.nativeElement.value,
        wikiPage: wikiValue,
        bandPage: bandPageValue,
        ticketPurchasePage: this.ticketInputRef.nativeElement.value,
        imageURL: this.azureService.imageUrl
      }
      this.httpService.saveEvent(futureEvent).subscribe((data:FutureEvent) => { });
  }

  onFileSelected(e: any): void {
    const file = e.target.files[0];
    if (file) {
      this.azureService.uploadImageToAzureBlob(file);
    }
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