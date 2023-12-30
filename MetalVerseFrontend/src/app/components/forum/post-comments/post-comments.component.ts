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
    rockedOnPost: boolean = false;
    rockedOnMap: { [commentId: string]: boolean } = {};

    
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
        data.comments.forEach((comment: Comment) => {
          if(comment.id != undefined) {
            this.rockedOnMap[comment.id] = false;
          }
        });
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
