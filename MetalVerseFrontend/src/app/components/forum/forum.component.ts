import { Component, ElementRef, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BackendHttpService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
    public posts: Post[];

    @ViewChild('searchInput') searchInputRef: ElementRef;
    private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService) { 
        this.httpService = httpService;
        this.httpService.getPosts().subscribe((data:Post[]) => {
            this.posts = data;
        });
    }

    searchPost(): void {
       this.httpService.searchPost(this.searchInputRef.nativeElement.value).subscribe((data:Post[]) => {
            this.posts = data;
       });
    }

    sortByNewest(): void {
        this.httpService.getNewestPosts().subscribe((data:Post[]) => {
            this.posts = data;
        });
    }

    sortByPopularity(): void {
        this.httpService.getPopularPosts().subscribe((data:Post[]) => {
            this.posts = data;
        });
    }
}
