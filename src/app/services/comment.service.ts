import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../Dtos/Post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private serverUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getAll(id: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.serverUrl+'/Comment/'+id);
  }
  public deleteComment(userid: string,commentid: string): Observable<any>{
    return this.http.delete(this.serverUrl+"/Comment/" + userid+ "/" + commentid);
  }
  public updateComment(ownerId: string, comment: Comment): Observable<any>{
    return this.http.put(this.serverUrl+'/Comment/' + ownerId + '/' + comment.id, comment);
  }
  public createComment(comment: any) : Observable<any>{
    return this.http.post(this.serverUrl+'/Comment/'+comment.ownerId+'/'+comment.postId, comment);
  }
}
