import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Forum, Post } from '../Dtos/Post';
import { ForumService } from '../services/forum.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  currentUser: string = "";
  forumId: string = "";
  forum?: Forum;
  posts: Post[] = [];
  constructor(private route: ActivatedRoute, private forumService: ForumService, private postService: PostService, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('id')!;
    this.forumId = this.route.snapshot.paramMap.get('id')!;
    this.forumService.getById(this.forumId).subscribe(
      (Response: Forum) => {
        this.forum = Response;
      }
    );
    this.postService.getAll(this.forumId).subscribe(
      (Response: Post[]) => {
        this.posts = Response;
      }
    )
  }

  public deletePost(id: string): void {
    this.postService.deletePost(this.currentUser, id).subscribe(
      ()=>{
        this.posts.forEach((element, index) => {
          if(element.id == id){
            this.posts.splice(index,1);
          }
        });
      }
    )
  }

  public openDialog(): void {
    let dialogRef = this.dialogService.open(CreatePostComponent, {
      height: '500px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe( result => {
      let post = {forumId: this.forumId, title: result.value['title'], description: result.value['description'], ownerId: localStorage.getItem('id')};
      this.postService.createPost(post).subscribe(() => {
          this.ngOnInit();
      });
    });
  }

}
