import { Injectable } from '@angular/core';
import { Server } from '../constant/server';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constant: Server = new Server();
  host = this.constant.host;
  clientHost = this.constant.client;
  userHost = this.constant.userPicture
  postHost = this.constant.postPicture

  constructor(private http: HttpClient) { }


  save(post: Post) : Observable<Post> {
    return this.http.post<Post>(`${this.host}/post/save`,post)
  }

  getOnePostById(postId: number) : Observable<Post> {
    return this.http.get<Post>(`${this.host}/post/getPostById/${postId}`)
  }


  getPostsByUsername(username: string) : Observable<Post> {
    return this.http.get<Post>(`${this.host}/post/getPostByUsername/${username}`)
  }

  saveComment(comment: Comment) : Observable<Comment> {
    return this.http.post<Comment>(`${this.host}/post/comment/add`,comment)
  }

  delete(postId: number) : Observable<Post> {
    return this.http.delete<Post>(`${this.host}/post/delete`)
  }

  like(postId: number,username: string){
    return this.http.post(`${this.host}/post/like/`,{postId,username}, {
      responseType: 'text'
    })
  }

  unLike(postId: number,username: string){
    return this.http.post(`${this.host}/post/unLike/`,{postId,username}, {
      responseType: 'text'
    })
  }

  uploadPostPicture(picture: File) {
    const fd = new FormData();
    fd.append("image",picture,picture.name);

    return this.http.post(`${this.host}/post/photo/upload`,fd,{
      responseType:"text",
      reportProgress: true,
      observe: 'events'
    })
  }
}
