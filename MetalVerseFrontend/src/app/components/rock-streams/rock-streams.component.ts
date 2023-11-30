import { Component, ElementRef, ViewChild } from '@angular/core';
import { RockStream } from 'src/app/models/rock-stream';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rock-streams',
  templateUrl: './rock-streams.component.html',
  styleUrls: ['./rock-streams.component.css']
})
export class RockStreamsComponent {
    public streams: RockStream[];

    @ViewChild('searchInput') searchInputRef: ElementRef;
  private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.httpService.getStreams().subscribe((data:RockStream[]) => {
         this.streams= data;
      });
    }

    searchStream(): void {
      this.httpService.searchStream(this.searchInputRef.nativeElement.value).subscribe((data:RockStream[]) => {
        this.streams = data;
      });
    }
}
