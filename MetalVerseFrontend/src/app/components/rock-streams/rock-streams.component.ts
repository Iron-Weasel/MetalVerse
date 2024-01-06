import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject, Subscription, interval } from 'rxjs';
import { RockStream } from 'src/app/models/rock-stream';
import { StreamMetadata } from 'src/app/models/streamMetadata';
import { BackendHttpService } from 'src/app/services/backend.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-rock-streams',
  templateUrl: './rock-streams.component.html',
  styleUrls: ['./rock-streams.component.css']
})

export class RockStreamsComponent {
  private httpService: BackendHttpService;
  protected playerService: PlayerService;
  public streams: RockStream[];
  private metadataUpdateSubscription: Subscription;

  private streamsObs: ReplaySubject<RockStream[]> = new ReplaySubject<RockStream[]>(1);  // send data
  public streamsObs$ = this.streamsObs.asObservable();  // receive data

  @ViewChild('searchInput') searchInputRef: ElementRef;
  

  constructor(httpService: BackendHttpService, playerService: PlayerService) { 
    this.httpService = httpService;
    this.playerService = playerService;
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
    this.playerService.isPlayerOpen = true;
    this.playerService.isPlaying = true;

    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.playerService.play(data);
      this.getStreamMetadata(data.id);
      this.startMetadataPolling(data);
    });
  }

  pauseStream(streamId: string): void {
    this.playerService.isPlayerOpen = true;
    this.playerService.isPlaying = false;

    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.playerService.pause(data);
    });
  }

  stopStream(streamId: string): void {
    this.playerService.isPlayerOpen = false;
    this.playerService.isPlaying = false;

    this.httpService.getStream(streamId).subscribe((data:RockStream) => {
      this.playerService.stop(data);
      this.stopMetadataPolling();
    });
  }

  getStreamMetadata(streamId: string): void {
    this.httpService.getStreamMetadata(streamId).subscribe((data:StreamMetadata) => {
      this.playerService.metadata = data;
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
