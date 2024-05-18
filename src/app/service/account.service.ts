import { Injectable } from '@angular/core';
import { Server } from '../constant/server';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PasswordChange } from '../model/password-change';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constant: Server =new Server();
  host:string = this.constant.host;
  token?: string | null ;
  loggedInUsername!: string | null;
  redirectUrl!: string
  private googleMapsAPIKey = "Your key"
  private googleMapsAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?latIng=";
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(user:User): Observable<HttpErrorResponse | HttpResponse<any>> {
    return this.http.post<HttpErrorResponse | HttpResponse<any>>(`${this.host}/user/login`,user)
  }

  register(user:User): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/register`,user)
  }

  resetPassword(email: string){
    return this.http.get(`${this.host}/user/resetPassword/${email}`,{
      responseType: 'text'
    })
  }

  logOut(): void{
    this.token = null;
    localStorage.removeItem("token")
  }

  saveToken(token: string):void{
    this.token = token;
    localStorage.setItem("token",token)
  }
  loadToken():void{
    this.token = localStorage.getItem("token")
  }

  getToken(): string{
    return this.token!;
  }

  isLoggedIn() {
    this.loadToken()
    if(this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else{
      this.logOut()
      return false
    }
  }

  getUserInfo(username:string): Observable<User>{
    return this.http.get<User>(`${this.host}/user/${username}`)
  }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.host}/post/list`)
  }

  searchUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/findByUsername/${username}`)
  }

  getLocation(latitude: string,longitute:string): Observable<any>{
    return this.http.get<any>(`${this.googleMapsAPIUrl}` + `${latitude},${longitute}&key=${this.googleMapsAPIKey}`)
  }

  updateUser(user: User) : Observable<User>{
    return this.http.post<User>(`${this.host}/user/update`,user)
  }

  changePassword(password: PasswordChange){
    return this.http.post(`${this.host}/user/changePassword`,password,{responseType:'text'})
  }

  uploadUserProfilePicture(picture: File) {
    const fd = new FormData();
    fd.append("image",picture)
    return this.http.post(`${this.host}/user/photo/upload`,fd,{responseType:'text'})
    .subscribe((response:any) => {
      console.log(response)
      console.log("User profile picture was uploaded. "+response)
    },
    error => {
      console.log(error)
    })
  }
}
