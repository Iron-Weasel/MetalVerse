import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { Observable } from "rxjs";
import { Announcement } from "../models/announcement";
import { FutureEvent } from "../models/future-event";
import { RockStream } from "../models/rock-stream";
import { Comment } from "../models/comment";
import { User } from "../models/user";

@Injectable({providedIn: 'root'})

export class BackendHttpService {
    private httpService: HttpClient;

    constructor(httpService: HttpClient) {
        this.httpService = httpService;
    }

    // register user
    saveUser(userData: User): Observable<User> {
        return this.httpService.post<User>('https://localhost:7206/users/add_user', userData);
    }

    // get all posts from BE
    getPosts(): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts');
    }

    // get a post by its Id from BE
    getPost(postId: string): Observable<Post> {
        return this.httpService.get<Post>('https://localhost:7206/posts/' + postId);
    }

    // write a new post and send data to BE
    savePost(postData: Post): Observable<Post> {
        return this.httpService.post<Post>('https://localhost:7206/posts/add_post', postData);
    }

    // post a comment to a post and send data to BE
    postComment(postId: string, commentData: Comment): Observable<Comment> {
        return this.httpService.post<Comment>('https://localhost:7206/posts/' + postId + '/comments/add_comment', commentData);
    }


    // get all announcements from BE
    getAnnouncements(): Observable<Announcement[]> {
        return this.httpService.get<Announcement[]>('https://localhost:7206/announcements');
    }

    // get an announcement by its Id from BE
    getAnnouncement(announcementId: string): Observable<Announcement> {
        return this.httpService.get<Announcement>('https://localhost:7206/announcements/' + announcementId);
    }

    // create a new announcement and send data to BE
    saveAnnouncement(announcementData: Announcement): Observable<Announcement> {
        return this.httpService.post<Announcement>('https://localhost:7206/announcements/add_announcement', announcementData);
    }



    // get all events from BE
    getEvents(): Observable<FutureEvent[]> {
        return this.httpService.get<FutureEvent[]>('https://localhost:7206/events');
    }

    // get an event by its Id from BE
    getEvent(eventId: string): Observable<FutureEvent> {
        return this.httpService.get<FutureEvent>('https://localhost:7206/events/' + eventId);
    }

    // create a new event and send data to BE
    saveEvent(eventData: FutureEvent): Observable<FutureEvent> {
        return this.httpService.post<FutureEvent>('https://localhost:7206/events/add_event', eventData);
    }



    // get all streams from BE
    getStreams(): Observable<RockStream[]> {
        return this.httpService.get<RockStream[]>('https://localhost:7206/stream');
    }
 
}