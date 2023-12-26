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
    public comments: Comment[];
    public idPost: string;

    private postComments: ReplaySubject<Comment[]> = new ReplaySubject<Comment[]>(1);  // send data
    public postComments$ = this.postComments.asObservable();  // receive data

    @ViewChild('commentInput') commentInputRef: ElementRef;

    
    constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
      this.httpService = httpService;
      this.idPost = String(this.route.snapshot.paramMap.get('id'));
      this.loadComments();

      this.httpService.commentCreated$.subscribe(() => {
        this.loadComments();
      });
    }

    loadComments(): void {
      this.httpService.getPost(this.idPost).subscribe((data:Post) => {
        this.postComments.next(data.comments);
        this.comments = data.comments;
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
