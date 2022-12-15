import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post, Comment } from '../Dtos/Post';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  currentUser: string = '';
  postId: string = '';
  post?: Post;
  comments: Comment[] = [];
  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });
  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService) { }
  
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('id')!;
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.postService.getById(this.postId).subscribe(
      (Response: Post) => {
        this.post = Response;
      }
    );
    this.commentService.getAll(this.postId).subscribe(
      (Response: Comment[]) => {
        this.comments = Response;
      }
    );
  }

  public deleteComment(id: string): void {
    this.commentService.deleteComment(this.currentUser, id).subscribe(
      ()=>{
        this.comments.forEach((element, index) => {
          if(element.id == id){
            this.comments.splice(index,1);
          }
        });
      }
    )
  }

  public submit(): void {
    let comment = {text: this.commentForm.value['comment'], ownerId: this.currentUser, postId: this.postId};
    this.commentService.createComment(comment).subscribe(() => {
      this.ngOnInit();
    })
  }

}
