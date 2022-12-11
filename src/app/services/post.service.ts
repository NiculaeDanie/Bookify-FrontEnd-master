import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../Dtos/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private serverUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getAll(id: string): Observable<Post[]>{
    return this.http.get<Post[]>(this.serverUrl+'/Post/all/'+id);
  }
  public getById(id: string): Observable<Post>{
    return this.http.get<Post>(this.serverUrl+'/Post/'+id);
  }
  public deletePost(userid: string,postid: string): Observable<any>{
    return this.http.delete(this.serverUrl+"/Post/" + userid+ "/" + postid);
  }
  public updatePost(ownerId: string, post: Post): Observable<any>{
    return this.http.put(this.serverUrl+'/Post/'+ownerId+'/'+post.id, post);
  }
  public createPost(post: Post) : Observable<any>{
    return this.http.post(this.serverUrl+'/Post', post);
  }
}
