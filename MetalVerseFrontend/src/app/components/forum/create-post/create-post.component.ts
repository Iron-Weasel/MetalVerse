import { Component, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  //TODO: would be nicer to use FormsModel next time
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef: ElementRef;

  private httpService: BackendHttpService;

  constructor(httpService: BackendHttpService) { 
    this.httpService  = httpService;
  }

  // clicking on "Post" will create a new post
  onSavePost(): void {
      const post: Post = {
        userId: "715a5636-51bc-4a12-a961-a425750d398c",
        title: this.titleInputRef.nativeElement.value,
        description: this.descriptionInputRef.nativeElement.value,
        imageURL: "some image",
        comments: []
      }
      this.httpService.savePost(post).subscribe((data:Post) => { });
  }
}