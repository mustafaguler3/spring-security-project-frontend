import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Post } from '../model/post';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<Post>{

  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post>  {
    const postId: number = route.params['postId'];
    return this.postService.getOnePostById(postId) 
  }
}
