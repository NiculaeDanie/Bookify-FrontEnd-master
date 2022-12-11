import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllForumComponent } from './all-forum/all-forum.component';
import { ForumComponent } from './forum/forum.component';
import { AuthGuard } from './guards/auth-guard.service';
import { UserGuard } from './guards/user-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyForumComponent } from './my-forum/my-forum.component';
import { PostComponent } from './post/post.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', component: LoginComponent },
  { path: 'register',  pathMatch: 'full', component: SignupComponent },
  { path: 'home', component: HomeComponent ,
  children:[
    {
      path: 'all',  
      component: AllForumComponent, 
    },
    {
      path: '',  
      component: MyForumComponent, 
    },
    {
      path: 'forum/:id',  
      component: ForumComponent, 
    },
    {
      path: 'post/:id',  
      component: PostComponent, 
    },
  ], canActivate:[UserGuard]
},
  
  {path: '**', loadChildren: () => import('./page-not-found/page-not-fond.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
