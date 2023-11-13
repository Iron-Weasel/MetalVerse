import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
    public posts: Post[];

    constructor(httpService: BackendHttpService) { 
         httpService.getPosts().subscribe((data:Post[]) => {
            this.posts = data;
        });
    }
}
