import { Component, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Post } from 'src/app/models/post';
import { AzureStorageService } from 'src/app/services/azure-storage.service';
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
  userIdLoggedIn: string;

  constructor(httpService: BackendHttpService, private jwtHelper: JwtHelperService, private azureService: AzureStorageService) { 
    this.httpService  = httpService;
    this.getUserLoggedIn();
  }

  getUserLoggedIn() {
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
        imageURL: this.azureService.imageUrl,
        comments: []
      }
      this.httpService.savePost(post).subscribe((data:Post) => { });
  }

  onFileSelected(e: any): void {
    const file = e.target.files[0];
    if (file) {
      this.azureService.uploadImageToAzureBlob(file);
    }
  }
}