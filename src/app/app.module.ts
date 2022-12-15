import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './guards/AuthInterceptor';
import { AuthGuard } from './guards/auth-guard.service';
import { UserGuard } from './guards/user-guard.service';
import { AllForumComponent } from './all-forum/all-forum.component';
import { MyForumComponent } from './my-forum/my-forum.component';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';
import { CreateForumComponent } from './create-forum/create-forum.component';
import { CreatePostComponent } from './create-post/create-post.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    SignupComponent,
    AllForumComponent,
    MyForumComponent,
    ForumComponent,
    PostComponent,
    CreateForumComponent,
    CreatePostComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    AuthGuard,
    UserGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
