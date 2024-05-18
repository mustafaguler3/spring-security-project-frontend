import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostResolverService } from './service/post-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { authenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"resetPassword",component: ResetPasswordComponent},
  {path:"",redirectTo:"/home",pathMatch: "full"},
  {path:"home",component: HomeComponent,canActivate: [authenticationGuard]},
  {path:"post/:postId",component: PostDetailComponent,resolve: {resolvedPost: PostResolverService},canActivate:[authenticationGuard]},
  {path:"profile/:username",component: ProfileComponent,canActivate: [authenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
