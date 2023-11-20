import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent{
  public comments: Comment[];
  public idPost: string;
  //TODO: would be nicer to use FormsModel next time
  @ViewChild('commentInput') commentInputRef: ElementRef;

  private httpService: BackendHttpService;

  constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
    this.httpService = httpService;
    this.idPost = String(this.route.snapshot.paramMap.get('id'));
    this.httpService.getPost(this.idPost).subscribe((data:Post) => {
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
  }

}
