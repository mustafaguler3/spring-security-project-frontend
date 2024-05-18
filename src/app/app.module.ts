import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AccountService } from './service/account.service';
import { SpinnerService } from './service/spinner.service';
import { PostService } from './service/post.service';
import { AlertService } from './service/alert.service';
import { Post } from './model/post';
import { PostResolverService } from './service/post-resolver.service';
import { authenticationGuard } from './guard/authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
    
  ],
  providers: [
    AccountService,
    SpinnerService,
    PostService,
    AlertService,PostResolverService,
    //authenticationGuard,
    {provide: HTTP_INTERCEPTORS,useClass: AuthenticationInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass: CacheInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
