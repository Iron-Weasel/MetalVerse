import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { Observable, ReplaySubject, Subject, tap } from "rxjs";
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

    // OBSERVABLES
    // notify about a newly created post
    private postCreatedSource = new Subject<void>();
    postCreated$ = this.postCreatedSource.asObservable();

    // notify about a posted comment
    private commentCreatedSource = new Subject<void>();
    commentCreated$ = this.commentCreatedSource.asObservable();

    // notify about a newly created announcement
    private announcementCreatedSource = new Subject<void>();
    announcementCreated$ = this.announcementCreatedSource.asObservable();

    // notify about a newly created event
    private eventCreatedSource = new Subject<void>();
    eventCreated$ = this.eventCreatedSource.asObservable();

    // notify about an updated rock-ons count for a comment
    private commentUpdatedSource = new Subject<void>();
    commentUpdatedSource$ = this.commentUpdatedSource.asObservable();

    // notify about an updated rock-ons count for a post
    private postUpdatedSource = new Subject<void>();
    postUpdatedSource$ = this.postUpdatedSource.asObservable();



    // USER
    // register user
    saveUser(userData: User): Observable<User> {
        return this.httpService.post<User>('https://localhost:7206/users/add_user', userData);
    }


    // FORUM
    // get all posts from BE
    getPosts(): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts');
    }

    // sort by newest posts
    getNewestPosts(): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts/sort_newest');
    }

    // sort by most popular posts
    getPopularPosts(): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts/sort_popular');
    }

    // get a post by its Id from BE
    getPost(postId: string): Observable<Post> {
        return this.httpService.get<Post>('https://localhost:7206/posts/' + postId);
    }

    // search a post by a string from BE
    searchPost(keyword: string): Observable<Post[]> {
        return this.httpService.get<Post[]>('https://localhost:7206/posts/search_result?search=' + keyword);
    }

    // write a new post and send data to BE
    savePost(postData: Post): Observable<Post> {
        return this.httpService.post<Post>('https://localhost:7206/posts/add_post', postData).pipe(
            tap(() => {
                this.postCreatedSource.next();
            })
        );
    }

    // increment number of views each time a post is visited
    increasePostViews(postId: string): Observable<Post> {
        return this.httpService.post<Post>('https://localhost:7206/posts/post_visited/' + postId, postId).pipe(
            tap(() => {
                this.postUpdatedSource.next();
            })
        );
    }

    // increment number of rock-ons for a post
    increasePostRockOns(postId: string): Observable<Post> {
        return this.httpService.post<Post>('https://localhost:7206/posts/post_liked/' + postId, postId).pipe(
            tap(() => {
                this.postUpdatedSource.next();
            })
        );
    }

    // decrement number of rock-ons for a post
    decreasePostRockOns(postId: string): Observable<Post> {
        return this.httpService.post<Post>('https://localhost:7206/posts/post_disliked/' + postId, postId).pipe(
            tap(() => {
                this.postUpdatedSource.next();
            })
        );
    }

    // post a comment to a post and send data to BE
    postComment(postId: string, commentData: Comment): Observable<Comment> {
        return this.httpService.post<Comment>('https://localhost:7206/posts/' + postId + '/comments/add_comment', commentData).pipe(
            tap(() => {
                this.commentCreatedSource.next();
            })
        );
    }

    // increment number of rock-ons for a comment
    increaseCommentRockOns(postId: string, commentId: string): Observable<Comment> {
        return this.httpService.post<Comment>('https://localhost:7206/posts/' + postId + '/comment_liked/' + commentId, commentId).pipe(
            tap(() => {
                this.commentUpdatedSource.next();
            })
        );
    }

    // decrement number of rock-ons for a comment
    decreaseCommentRockOns(postId: string, commentId: string): Observable<Comment> {
        return this.httpService.post<Comment>('https://localhost:7206/posts/' + postId + '/comment_disliked/' + commentId, commentId).pipe(
            tap(() => {
                this.commentUpdatedSource.next();
            })
        );
    }


    // ANNOUCEMENTS
    // get all announcements from BE
    getAnnouncements(): Observable<Announcement[]> {
        return this.httpService.get<Announcement[]>('https://localhost:7206/announcements');
    }

    // get an announcement by its Id from BE
    getAnnouncement(announcementId: string): Observable<Announcement> {
        return this.httpService.get<Announcement>('https://localhost:7206/announcements/' + announcementId);
    }

    // search an announcement by a string from BE
    searchAnnouncement(keyword: string): Observable<Announcement[]> {
        return this.httpService.get<Announcement[]>('https://localhost:7206/announcements/search_result?search=' + keyword);
    }

    // create a new announcement and send data to BE
    saveAnnouncement(announcementData: Announcement): Observable<Announcement> {
        return this.httpService.post<Announcement>('https://localhost:7206/announcements/add_announcement', announcementData).pipe(
            tap(() => {
                this.announcementCreatedSource.next();
            })
        );
    }



    //FUTURE EVENTS
    // get all events from BE
    getEvents(): Observable<FutureEvent[]> {
        return this.httpService.get<FutureEvent[]>('https://localhost:7206/events');
    }

    // get an event by its Id from BE
    getEvent(eventId: string): Observable<FutureEvent> {
        return this.httpService.get<FutureEvent>('https://localhost:7206/events/' + eventId);
    }

    // search an event by a string from BE
    searchEvent(keyword: string): Observable<FutureEvent[]> {
        return this.httpService.get<FutureEvent[]>('https://localhost:7206/events/search_result?search=' + keyword);
    }

    // create a new event and send data to BE
    saveEvent(eventData: FutureEvent): Observable<FutureEvent> {
        return this.httpService.post<FutureEvent>('https://localhost:7206/events/add_event', eventData).pipe(
            tap(() => {
                this.eventCreatedSource.next();
            })
        );
    }


    // STREAM
    // get all streams from BE
    getStreams(): Observable<RockStream[]> {
        return this.httpService.get<RockStream[]>('https://localhost:7206/stream');
    }

    getStream(streamId: string): Observable<RockStream> {
        return this.httpService.get<RockStream>('https://localhost:7206/stream/' + streamId);
    }

    // search a stream by a string from BE
    searchStream(keyword: string): Observable<RockStream[]> {
        return this.httpService.get<RockStream[]>('https://localhost:7206/stream/search_result?search=' + keyword);
    }
 
}