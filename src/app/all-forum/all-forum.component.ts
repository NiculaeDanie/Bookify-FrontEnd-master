import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { CreateForumComponent } from '../create-forum/create-forum.component';
import { Forum } from '../Dtos/Post';
import { AuthenticationService } from '../services/authentication.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-all-forum',
  templateUrl: './all-forum.component.html',
  styleUrls: ['./all-forum.component.css']
})
export class AllForumComponent implements OnInit {
  forums: Forum[] = [];
  constructor(private forumService: ForumService, private router: Router, private dialogService: MatDialog, private userService: AuthenticationService) { }

  ngOnInit(): void {
    this.forumService.getAll().subscribe(
      (response: Forum[]) => {
        this.forums = response;
        this.forums.forEach( forum => {
          this.userService.getUsername(forum.ownerId).subscribe( response => {
            forum.userName=response.name;
          })
        });
      }
    )
  }

  public joinForum(forumId: string){
    this.forumService.joinForum(localStorage.getItem('id')!, forumId).subscribe(
      () => {
        this.router.navigate(['/home/forum',forumId]);
      }
    );
  }

  public openDialog(): void {
    let dialogRef = this.dialogService.open(CreateForumComponent, {
      height: '500px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe( result => {
      let form = { name: result.value['title'], description: result.value['description'], price: result.value['price'], ownerId: localStorage.getItem('id')};
      this.forumService.createForum(form).subscribe((result: Forum) => {
          this.ngOnInit();
      });
    });
  }

}
