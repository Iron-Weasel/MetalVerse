import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { Observable } from "rxjs";
import { Announcement } from "../models/announcement";
import { FutureEvent } from "../models/future-event";
import { RockStream } from "../models/rock-stream";
import { Comment } from "../models/comment";

@Injectable({providedIn: 'root'})

export class BackendHttpService {
    private httpService: HttpClient;

    constructor(httpService: HttpClient) {
        this.httpService = httpService;
    }

    getPosts(): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts');
    }

    getAnnouncements(): Observable<Announcement[]> {
        return this.httpService.get<Announcement[]>('https://localhost:7206/announcements');
    }

    getEvents(): Observable<FutureEvent[]> {
        return this.httpService.get<FutureEvent[]>('https://localhost:7206/events');
    }

    getStreams(): Observable<RockStream[]> {
        return this.httpService.get<RockStream[]>('https://localhost:7206/stream');
    }

    getPost(postId: string): Observable<Post> {
        return this.httpService.get<Post>('https://localhost:7206/posts/' + postId);
    }
}