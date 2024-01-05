import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RockStream } from 'src/app/models/rock-stream';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rock-streams',
  templateUrl: './rock-streams.component.html',
  styleUrls: ['./rock-streams.component.css']
})

export class RockStreamsComponent {
  private httpService: BackendHttpService;
  public streams: RockStream[];
  audioPlayer = new Audio();

  private streamsObs: ReplaySubject<RockStream[]> = new ReplaySubject<RockStream[]>(1);  // send data
  public streamsObs$ = this.streamsObs.asObservable();  // receive data

  @ViewChild('searchInput') searchInputRef: ElementRef;
  

  constructor(httpService: BackendHttpService) { 
    this.httpService = httpService;
    this.loadStreams();
  }
  
  loadStreams(): void {
    this.httpService.getStreams().subscribe((data:RockStream[]) => {
        this.streamsObs.next(data);
        this.streams= data;
    });
  }

  searchStream(): void {
    if(this.searchInputRef.nativeElement.value == '') this.loadStreams();
    else {
      this.httpService.searchStream(this.searchInputRef.nativeElement.value).subscribe((data:RockStream[]) => {
        this.streamsObs.next(data);
        this.streams = data;
      });
      this.searchInputRef.nativeElement.value = '';
    }
  }

  playStream(streamId: string): void {
    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.audioPlayer.src = data.apiLink;
      this.audioPlayer.play();
    });
  }

  pauseStream(streamId: string): void {
    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.audioPlayer.src = data.apiLink;
      this.audioPlayer.pause();
    });
  }

  stopStream(streamId: string): void {
    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.audioPlayer.src = data.apiLink;
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
    });
  }
}
