import { Component } from '@angular/core';
import { RockStream } from 'src/app/models/rock-stream';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rock-streams',
  templateUrl: './rock-streams.component.html',
  styleUrls: ['./rock-streams.component.css']
})
export class RockStreamsComponent {
    public streams: RockStream[];

    constructor(httpService: BackendHttpService) { 
      httpService.getStreams().subscribe((data:RockStream[]) => {
         this.streams= data;
      });
    }
}
