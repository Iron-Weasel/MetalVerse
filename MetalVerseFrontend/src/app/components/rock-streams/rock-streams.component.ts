import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject, Subscription, interval } from 'rxjs';
import { RockStream } from 'src/app/models/rock-stream';
import { StreamMetadata } from 'src/app/models/streamMetadata';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rock-streams',
  templateUrl: './rock-streams.component.html',
  styleUrls: ['./rock-streams.component.css']
})

export class RockStreamsComponent {
  private httpService: BackendHttpService;
  public streams: RockStream[];
  public metadata: StreamMetadata | null;
  private metadataUpdateSubscription: Subscription;
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
      this.getStreamMetadata(data.id);
      this.startMetadataPolling(data);
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
      this.stopMetadataPolling();
      this.metadata = null;
    });
  }

  getStreamMetadata(streamId: string): void {
    this.httpService.getStreamMetadata(streamId).subscribe((data:StreamMetadata) => {
      this.metadata = data;
    });
  }


  private startMetadataPolling(stream: RockStream): void {
    this.stopMetadataPolling(); 
    this.metadataUpdateSubscription = interval(60000).subscribe(() => {
      this.getStreamMetadata(stream.id);
    });
  }

  private stopMetadataPolling(): void {
    if (this.metadataUpdateSubscription) {
      this.metadataUpdateSubscription.unsubscribe();
    }
  }
}
