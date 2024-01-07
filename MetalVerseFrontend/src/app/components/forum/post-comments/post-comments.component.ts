import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { BackendHttpService } from 'src/app/services/backend.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})

export class PostCommentsComponent{
    private httpService: BackendHttpService;
    public post: Post;
    public idPost: string;

    private commentsObs: ReplaySubject<Comment[]> = new ReplaySubject<Comment[]>(1);  // send data
    public commentsObs$ = this.commentsObs.asObservable();  // receive data

    private rockOnsPost: ReplaySubject<Post> = new ReplaySubject<Post>(1);  // send data
    public rockOnsPost$ = this.rockOnsPost.asObservable();  // receive data

    private viewsPost: ReplaySubject<Post> = new ReplaySubject<Post>(1);  // send data
    public viewsPost$ = this.viewsPost.asObservable();  // receive data

    private rockOnsComment: ReplaySubject<Comment> = new ReplaySubject<Comment>(1);  // send data
    public rockOnsComment$ = this.rockOnsComment.asObservable();  // receive data

    @ViewChild('commentInput') commentInputRef: ElementRef;
    // variables related to the post itself
    rockedOnPost: boolean = false;
    dateCreatedPostText: string;
    // variables related to the comments
    rockedOnMap: { [commentId: string]: boolean } = {};
    dateCreatedMapText: { [commentId: string]: string} = {};

    
    constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
      this.httpService = httpService;
      this.idPost = String(this.route.snapshot.paramMap.get('id'));
      this.increasePostViews(this.idPost);
      this.loadComments();

      // once a new comment has been posted, reload the comments along with the new one
      this.httpService.commentCreated$.subscribe(() => {
        this.loadComments();
      });
    }

    // get initial data about comments
    private loadComments(): void {
      this.httpService.getPost(this.idPost).subscribe((data:Post) => {
        this.commentsObs.next(data.comments);

        this.post = data;
        if(data.createdDate != undefined) {
          this.dateCreatedPostText = this.getTimeDifference(data.createdDate);
        }
        
        data.comments.forEach((comment: Comment) => {
          if(comment.id != undefined) {
            this.rockedOnMap[comment.id] = false;
            if(comment.postedDate != undefined) {
              this.dateCreatedMapText[comment.id] = this.getTimeDifference(comment.postedDate);
            }
          }
        });
      });
    }

    private getTimeDifference(dateTimeComment: string): string {
      const dateTime = new Date(dateTimeComment);
      const now = new Date();
      const difference = now.getTime() - dateTime.getTime();
      const differenceInSeconds = Math.floor(difference / 1000);

      var dateCreatedString = '';

      switch(true) {
        case (differenceInSeconds < 60): 
              dateCreatedString =  differenceInSeconds + ' seconds ago';
              break;
        case (differenceInSeconds >= 60 && differenceInSeconds < 120): 
              dateCreatedString =  Math.floor(differenceInSeconds / 60) + ' minute ago';
              break;
        case (differenceInSeconds >= 120 && differenceInSeconds < 3600): 
              dateCreatedString =  Math.floor(differenceInSeconds / 60) + ' minutes ago';
              break;
        case (differenceInSeconds >= 3600 && differenceInSeconds < 7200): 
              dateCreatedString =  Math.floor(differenceInSeconds / 3600) + ' hour ago';
              break;
        case (differenceInSeconds >= 7200 && differenceInSeconds < 84000): 
              dateCreatedString =  Math.floor(differenceInSeconds / 3600) + ' hours ago';
              break;
        case (differenceInSeconds >= 84000 && differenceInSeconds < 168000): 
              dateCreatedString =  Math.floor(differenceInSeconds / 84000) + ' day ago';
              break;
        case (differenceInSeconds >= 168000 && differenceInSeconds < 588000): 
              dateCreatedString =  Math.floor(differenceInSeconds / 84000) + ' days ago';
              break;
        case (differenceInSeconds >= 588000 && differenceInSeconds < 1176000): 
              dateCreatedString =  Math.floor(differenceInSeconds / 588000) + ' week ago';
              break;
        case (differenceInSeconds >= 1176000 && differenceInSeconds <= 31622400): 
              dateCreatedString =  Math.floor(differenceInSeconds / 588000) + ' weeks ago';
              break;
        default: dateCreatedString = 'Time format is not right';
      }

      return dateCreatedString;
    }

    increasePostViews(postId: string): void {
      this.httpService.increasePostViews(postId).subscribe();
      this.httpService.postUpdatedSource$.subscribe(() => {
        this.updatePost();
      });
    }

    increaseRockOnPost(): void {
      if(this.idPost) {
        this.rockedOnPost = true;
        this.httpService.increasePostRockOns(this.idPost).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost();
        });
      }
    }

    decreaseRockOnPost(): void {
      if(this.idPost) {
        this.rockedOnPost = false;
        this.httpService.decreasePostRockOns(this.idPost).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost();
        });
      }
    }

    increaseRockOnComments(commentId: string): void {
      if(commentId) {
        this.rockedOnMap[commentId] = true;
        this.httpService.increaseCommentRockOns(this.idPost, commentId).subscribe();
        this.httpService.commentUpdatedSource$.subscribe(() => {
          this.updateComment(commentId);
        });
      }
    }

    decreaseRockOnComments(commentId: string): void {
      if(commentId) {
        this.rockedOnMap[commentId] = false;
        this.httpService.decreaseCommentRockOns(this.idPost, commentId).subscribe();
        this.httpService.commentUpdatedSource$.subscribe(() => {
          this.updateComment(commentId);
        });
      }
    }

    private updatePost(): void {
      this.httpService.getPost(this.idPost).subscribe((data:Post) => {
          this.rockOnsPost.next(data);
          this.viewsPost.next(data);
          this.post = data;
      });
    }

    private updateComment(commentId: string): void {
      this.httpService.getPost(this.idPost).subscribe((data:Post) => {
        const commentIndex = this.post.comments.findIndex(c => c.id === commentId);
        this.commentsObs.next(data.comments);
        this.post.comments[commentIndex] = data.comments[commentIndex];
      });
    }

    // clicking on "Post" will post a comment
    postComment(): void {
      const comment: Comment = {
        postId: this.idPost,
        userName: "morgan", // shall be replaced with the logged in username
        text: this.commentInputRef.nativeElement.value
      };
      this.httpService.postComment(this.idPost, comment).subscribe((data:Comment) => { });
      this.commentInputRef.nativeElement.value = '';
    }
}
