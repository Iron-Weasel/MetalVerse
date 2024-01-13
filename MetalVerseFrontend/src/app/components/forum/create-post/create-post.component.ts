import { Component, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Post } from 'src/app/models/post';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef: ElementRef;

  private httpService: BackendHttpService;
  private userIdLoggedIn: string;
  private imageURLFromAzure: string;

  constructor(httpService: BackendHttpService, private jwtHelper: JwtHelperService) { 
    this.httpService  = httpService;
    this.getUserLoggedIn();
  }

  private getUserLoggedIn() {
    const token = localStorage.getItem("jwt");
    if(token) var decodedToken = this.jwtHelper.decodeToken(token);
    this.userIdLoggedIn = decodedToken['nameid'];
  }

  // clicking on "Post" will create a new post
  onSavePost(): void {
      const post: Post = {
        userId: this.userIdLoggedIn,
        title: this.titleInputRef.nativeElement.value,
        description: this.descriptionInputRef.nativeElement.value,
        imageURL: this.imageURLFromAzure,
        comments: []
      }
      this.httpService.savePost(post).subscribe((data:Post) => { });
  }

  onFileSelected(e: any): void {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);
      this.httpService.uploadImage(formData).subscribe((response: any) => {
        console.log(response.imageURL);
        this.imageURLFromAzure = response.imageURL;
      });
    }
  }
}