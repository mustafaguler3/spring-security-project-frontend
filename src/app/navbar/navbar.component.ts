import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { AccountService } from '../service/account.service';
import { PostService } from '../service/post.service';
import { SpinnerService } from '../service/spinner.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { HttpEventType } from '@angular/common/http';
import { AlertType } from '../enum/alert-type';
import { Post } from '../model/post';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnDestroy {

  private subscriptions: Subscription[] = [];

  user!: User;
  searchedUser!: User[];
  host!: string;
  userHost!: string;
  postHost!: string;
  postPicture!: File;
  userName!: string;
  userLoggedIn!: boolean;
  showNavbar!: boolean;
  showSuccessAlert!: boolean;
  photoName!: string;
  latitude: any;
  longitude: any;
  location = null;
  progress!: number;
  newPostURL!: string | null;
  clientHost!: string;
  postFail!: boolean;

  constructor(private router: Router,
              private alertService: AlertService,
              private accountService: AccountService,
              private postService: PostService,
              private spinnerService: SpinnerService){}

  ngOnInit(): void {
      this.spinnerService.isLoading.next(true)
      this.host = this.postService.host
      this.clientHost = this.postService.clientHost;
      this.userHost = this.postService.userHost;
      this.postHost = this.postService.postHost
      this.showNavbar = true
  }

  getUserInfo(username: string){
    this.subscriptions.push(
      this.accountService.getUserInfo(username).subscribe((response:any) => {
        this.user = response
        this.userLoggedIn = true
        this.showNavbar = true
      },
      error => {
        console.log(error)
        this.userLoggedIn = false
      })
    )
  }

  onSearchUsers(event:any) {
    const username = event;
    this.subscriptions.push(this.accountService.searchUsers(username).subscribe(
      response => {
        this.searchedUser = response
      },
      error => {
        console.log(error)
        return this.searchedUser = []
      }
    ))
  }

  getUserProfile(username: string) {
    this.router.navigate(["/profile",username])
  }

  getSearchUserProfile(username: string) {
    const element: any = document.getElementById('closeSearchModal')
    element.click()
    this.router.navigate(["/profile",username])

    setTimeout(() => {
      location.reload()
    },100)
  }

  onFileSelected(event: any) {
    this.postPicture = event.target.files[0]
    this.photoName = this.postPicture.name
  }

  onNewPost(post: Post) {
    const element: HTMLElement = document.getElementById("dismissOnSubmitPost") as HTMLElement
    element.click()

    this.spinnerService.isLoading.next(true)

    this.subscriptions.push(
      this.postService.save(post).subscribe(
        response => {
          let postId:number = response.id
          this.savePicture(this.postPicture)
          this.spinnerService.isLoading.next(false)
          this.newPostURL = `${this.clientHost}/post/${postId}`
        },
        error => {
          console.log(error)
          this.postFail = true
          this.spinnerService.isLoading.next(false)
        }
      )
    )
  }

  savePicture(picture: File) {
    this.subscriptions.push(
      this.postService.uploadPostPicture(picture).subscribe(
        response => {
          if (response.type === HttpEventType.UploadProgress){
            this.progress = Math.round(response.loaded / (response.total || 1))*100;
          }else {
            this.OnNewPostSuccess(8);
          }
        },
        error => {
          console.log(error)
        }
      )
    )
  }

  OnNewPostSuccess(second: number){
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false
      this.newPostURL = null
    },second * 1000)
  }

  logOut() {
    this.spinnerService.isLoading.next(true)
    this.accountService.logOut();
    this.router.navigateByUrl("/login")
    this.spinnerService.isLoading.next(false)
    this.alertService.showAlert("You have been successfully logged out",AlertType.SUCCESS)
  }

  getLonAndLat() {
    if(window.navigator && window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude;
          this.getUserLocation(this.latitude,this.longitude)
        },
        error => {
          switch(error.code){
            case 1:
              console.log("Permission Location Denied")
              break;
            case 2:
              console.log("Position Unavailable")
              break;
            case 3:
              console.log("Timeout")
              break;  
          }
        }
      )
    }
  }
  getUserLocation(latitude:any, longitude:any) {
    this.subscriptions.push(
      this.accountService.getLocation(latitude,longitude).subscribe(
        response => {
          this.location = response.results[3].formatted_address;
        },
        error => {
          console.log(error)
        }
      )
    )
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe)
  }
}
