import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forum } from '../Dtos/Post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private serverUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getAll(id?: string): Observable<Forum[]>{
    return this.http.get<Forum[]>(this.serverUrl+'/Forum/all');
  }
  public getMy(id?: string): Observable<Forum[]>{
    return this.http.get<Forum[]>(this.serverUrl+'/Forum/owned/'+ localStorage.getItem('id'));
  }
  public getById(id: string): Observable<Forum>{
    return this.http.get<Forum>(this.serverUrl+'/Forum/'+id);
  }
  public joinForum(userid: string,forumid: string): Observable<any>{
    return this.http.get(this.serverUrl+"/Forum/joinforum/" + userid+ "/" + forumid);
  }
  public deleteForum(userid: string,forumid: number): Observable<any>{
    return this.http.delete(this.serverUrl+"/Forum/" + userid+ "/" + forumid);
  }
  public updateForum(ownerId: string,Forum: Forum): Observable<any>{
    return this.http.put(this.serverUrl+'/Forum/'+ownerId+'/'+Forum.id, Forum);
  }
  public createForum(Forum: Forum) : Observable<any>{
    return this.http.post(this.serverUrl+'/Forum', Forum);
  }
}
