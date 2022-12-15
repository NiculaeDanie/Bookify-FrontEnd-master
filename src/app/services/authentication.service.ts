import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseDto } from '../Dtos/AuthResponseDto';
import { RegistrationResponseDto } from '../Dtos/RegistragitonDto';
import { User } from '../Dtos/User';
import { UserForAuthenticationDto } from '../Dtos/UserDto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  email?: string;
  private serverUrl = environment.apiBaseUrl;
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  public currentUser?: Observable<User>;
  constructor(private http: HttpClient) { }
  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    localStorage.setItem('email', body.email);
    return this.http.post<AuthResponseDto>(this.serverUrl+ "/User/login", body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  public registerUser = (route: string, body: User) => {
    return this.http.post<RegistrationResponseDto> (this.serverUrl+ "/User/register", body);
  }
  public getEmail(): string{
    return localStorage.getItem('email')!;
  }
  public getUsername(id: string): Observable<any>{
    return this.http.get<string>(this.serverUrl+'/User/username/'+ id);
  }
  public getId(): string{
    return localStorage.getItem('id')!;
  }
  public getRoles(): Observable<any[]>{
    var email = localStorage.getItem("email");
    return this.http.get<any[]>(this.serverUrl+"/User/getRoles/"+email)
  }
  public static getToken(){
    localStorage.getItem('token');
  }
  
  public logOut(){
    localStorage.setItem("token", '');
      localStorage.setItem("email", '');
      localStorage.setItem("Role", '');
      localStorage.setItem("id", '');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
     // get token from local storage
    if(token=='' || token == null){
      return false;
    }
    const payload = atob(token!.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    if(parsedPayload.exp < Date.now() / 1000){
      localStorage.setItem("token", '');
      localStorage.setItem("email", '');
      localStorage.setItem("Role", '');
      localStorage.setItem("id", '');
      return false;
    }
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
  }

}
