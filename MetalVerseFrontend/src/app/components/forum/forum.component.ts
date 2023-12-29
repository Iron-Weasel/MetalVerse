import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Post } from 'src/app/models/post';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent {
    private httpService: BackendHttpService;
    public posts: Post[];
    
    private postsObs: ReplaySubject<Post[]> = new ReplaySubject<Post[]>(1);  // send data
    public postsObs$ = this.postsObs.asObservable();  // receive data

    @ViewChild('searchInput') searchInputRef: ElementRef;
    rockedOnMap: { [postId: string]: boolean } = {};
    

    constructor(httpService: BackendHttpService) { 
      this.httpService = httpService;
      this.loadPosts();

      this.httpService.postCreated$.subscribe(() => {
        this.loadPosts();
      });
    }

    loadPosts(): void {
      this.httpService.getPosts().subscribe((data:Post[]) => {
        this.postsObs.next(data);
        this.posts = data;
        this.posts.forEach((post:Post) => {
          if(post.id != undefined){
            this.rockedOnMap[post.id] = false;
          }
          
        });
      });
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
        this.httpService.increasePostRockOns(postId).subscribe();
      }
    }

    decreaseRockOn(postId: string): void {
      if(postId) {
        this.rockedOnMap[postId] = false;
        this.httpService.decreasePostRockOns(postId).subscribe();
      }
    }
}
