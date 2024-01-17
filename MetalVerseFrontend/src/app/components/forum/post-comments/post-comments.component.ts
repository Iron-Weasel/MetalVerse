import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { BackendHttpService } from 'src/app/services/backend.service';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})

export class PostCommentsComponent{
    private httpService: BackendHttpService;
    public post: Post;
    public idPost: string;
    private usernameLoggedIn: string;

    private commentsObs: ReplaySubject<Comment[]> = new ReplaySubject<Comment[]>(1);  // send data
    public commentsObs$ = this.commentsObs.asObservable();  // receive data

    private rockOnsPost: ReplaySubject<Post> = new ReplaySubject<Post>(1);  // send data
    public rockOnsPost$ = this.rockOnsPost.asObservable();  // receive data

    private viewsPost: ReplaySubject<Post> = new ReplaySubject<Post>(1);  // send data
    public viewsPost$ = this.viewsPost.asObservable();  // receive data

    private rockOnsComment: ReplaySubject<Comment> = new ReplaySubject<Comment>(1);  // send data
    public rockOnsComment$ = this.rockOnsComment.asObservable();  // receive data

    @ViewChild('commentInput') commentInputRef: ElementRef;
    usernamePost: string;
    viewsCountMap: { [id: string]: number | undefined } = {};
    commentsCountMap: { [id: string]: number | undefined } = {};
    rockedOnMap: { [id: string]: boolean } = {};

    
    constructor(private route: ActivatedRoute, httpService: BackendHttpService, private jwtHelper: JwtHelperService) {
      this.httpService = httpService;
      this.idPost = String(this.route.snapshot.paramMap.get('id'));
      this.increasePostViews(this.idPost);
      this.loadComments();

      // once a new comment has been posted, reload the comments along with the new one
      this.httpService.commentCreated$.subscribe(() => {
        this.loadComments();
      });

      this.httpService.rockedOnState$.subscribe(state => {
        this.rockedOnMap = state;
      });

      this.getUserLoggedIn();
    }

    private getUserLoggedIn() {
      const token = localStorage.getItem("jwt");
      if(token) var decodedToken = this.jwtHelper.decodeToken(token);
      this.usernameLoggedIn = decodedToken['unique_name'];
    }

    // get initial data about comments
    private loadComments(): void {
      this.httpService.getPost(this.idPost).subscribe((data:Post) => {
        this.commentsObs.next(data.comments);

        this.post = data;
        this.httpService.getUser(data.userId).subscribe((data: User) => {
            if(data.id != undefined) this.usernamePost = data.username;
        });

        this.commentsCountMap[this.idPost] = data.comments.length;
        this.httpService.commsCount.next(this.commentsCountMap);
      });
    }

    increasePostViews(postId: string): void {
      this.httpService.increasePostViews(postId).subscribe();
      this.httpService.postUpdatedSource$.subscribe(() => {
        this.updatePost();
      });
    }

    increaseRockOnPost(): void {
      if(this.idPost) {
        this.rockedOnMap[this.idPost] = true;
        this.httpService.rockedOnState.next(this.rockedOnMap);
        this.httpService.increasePostRockOns(this.idPost).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost();
        });
      }
    }

    decreaseRockOnPost(): void {
      if(this.idPost) {
        this.rockedOnMap[this.idPost] = false;
        this.httpService.rockedOnState.next(this.rockedOnMap);
        this.httpService.decreasePostRockOns(this.idPost).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost();
        });
      }
    }

    increaseRockOnComments(commentId: string): void {
      if(commentId) {
        this.rockedOnMap[commentId] = true;
        this.httpService.rockedOnState.next(this.rockedOnMap);
        this.httpService.increaseCommentRockOns(this.idPost, commentId).subscribe();
        this.httpService.commentUpdatedSource$.subscribe(() => {
          this.updateComment(commentId);
        });
      }
    }

    decreaseRockOnComments(commentId: string): void {
      if(commentId) {
        this.rockedOnMap[commentId] = false;
        this.httpService.rockedOnState.next(this.rockedOnMap);
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
          if(this.idPost != undefined) {
            this.viewsCountMap[this.idPost] = data.views;
            this.httpService.viewsCount.next(this.viewsCountMap);
          }
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
        userName: this.usernameLoggedIn,
        text: this.commentInputRef.nativeElement.value
      };
      this.httpService.postComment(this.idPost, comment).subscribe((data:Comment) => { });
      this.commentInputRef.nativeElement.value = '';
    }
}
