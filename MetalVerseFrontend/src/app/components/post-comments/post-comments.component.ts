import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, httpService: BackendHttpService) {
    this.idPost = String(this.route.snapshot.paramMap.get('id'));
    httpService.getPost(this.idPost).subscribe((data:Post) => {
        this.comments = data.comments;
    });
  }

}
