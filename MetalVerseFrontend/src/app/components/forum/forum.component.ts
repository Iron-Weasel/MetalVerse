import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent {
    httpService: BackendHttpService;
    public posts: Post[];
    
    private postsObs: ReplaySubject<Post[]> = new ReplaySubject<Post[]>(1);  // send data
    public postsObs$ = this.postsObs.asObservable();  // receive data

    private rockOnsPost: ReplaySubject<Post> = new ReplaySubject<Post>(1);  // send data
    public rockOnsPost$ = this.rockOnsPost.asObservable();  // receive data

    @ViewChild('searchInput') searchInputRef: ElementRef;
    rockedOnMap: { [postId: string]: boolean } = {};
    dateCreatedMapText: { [commentId: string]: string} = {};
    usernameMap: { [userId: string]: string } = {};
    commentsNumberMap: { [postId: string]: number } = {};
    

    constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.loadPosts();

      this.httpService.postCreated$.subscribe(() => {
        this.loadPosts();
      });

      this.httpService.rockedOnState$.subscribe(state => {
        this.rockedOnMap = state;
      });
    }


    loadPosts(): void {
      this.httpService.getPosts().subscribe((data:Post[]) => {
        this.postsObs.next(data);
        this.posts = data;
        this.posts.forEach((post:Post) => {
          if(post.id != undefined) {
            const postId = post.id;
            if(post.createdDate != undefined) {
              this.dateCreatedMapText[postId] = this.getTimeDifference(post.createdDate);
            }
            this.getCommentsNumber(postId);
          }
          this.httpService.getUser(post.userId).subscribe((data: User) => {
              this.usernameMap[post.userId] = data.username;
          });
        });
      });
    }

    private getCommentsNumber(postId: string) {
      this.httpService.getPost(postId).subscribe((data: Post) => {
        this.commentsNumberMap[postId] = data.comments.length;
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

    searchPost(): void {
      if(this.searchInputRef.nativeElement.value == '') this.loadPosts();
      else {
         this.httpService.searchPost(this.searchInputRef.nativeElement.value).subscribe((data:Post[]) => {
            this.postsObs.next(data);
            this.posts = data;
         });
         this.searchInputRef.nativeElement.value = '';
      }
    }

    sortByNewest(): void {
      this.httpService.getNewestPosts().subscribe((data:Post[]) => {
        this.postsObs.next(data);
        this.posts = data;
      });
    }

    sortByPopularity(): void {
      this.httpService.getPopularPosts().subscribe((data:Post[]) => {
        this.postsObs.next(data);
        this.posts = data;
      });
    }

    increaseRockOn(postId: string): void {
      if(postId) {
        this.rockedOnMap[postId] = true;
        this.httpService.rockedOnState.next(this.rockedOnMap);
        this.httpService.increasePostRockOns(postId).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost(postId);
        });
      }
    }

    decreaseRockOn(postId: string): void {
      if(postId) {
        this.rockedOnMap[postId] = false;
        this.httpService.rockedOnState.next(this.rockedOnMap);
        this.httpService.decreasePostRockOns(postId).subscribe();
        this.httpService.postUpdatedSource$.subscribe(() => {
          this.updatePost(postId);
        });
      }
    }

    private updatePost(postId: string): void {
      this.httpService.getPost(postId).subscribe((data:Post) => {
          this.rockOnsPost.next(data);
          var index = this.posts.findIndex(c => c.id === postId)
          this.posts[index] = data;
      });
    }
}
