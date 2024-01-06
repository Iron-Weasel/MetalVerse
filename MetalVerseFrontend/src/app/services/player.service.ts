import { Injectable } from "@angular/core";
import { StreamMetadata } from "../models/streamMetadata";
import { RockStream } from "../models/rock-stream";

@Injectable({providedIn: 'root'})

// this is useful for when you navigate through other pages 
// and still want background music
export class PlayerService {
    isPlayerOpen: boolean = false;
    isPlaying: boolean = false;
    public metadata: StreamMetadata | null;
    public currentStream: RockStream;
    audioPlayer = new Audio();

    constructor() {}

    play(stream: RockStream): void {
        this.currentStream = stream;
        this.audioPlayer.src = stream.apiLink;
        this.audioPlayer.play();
    }

    pause(stream: RockStream): void {
        this.audioPlayer.src = stream.apiLink;
        this.audioPlayer.pause();
    }

    stop(stream: RockStream): void {
        this.audioPlayer.src = stream.apiLink;
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.metadata = null;
    }
}