import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateForumComponent } from '../create-forum/create-forum.component';
import { Forum } from '../Dtos/Post';
import { AuthenticationService } from '../services/authentication.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-my-forum',
  templateUrl: './my-forum.component.html',
  styleUrls: ['./my-forum.component.css']
})
export class MyForumComponent implements OnInit {
  forums: Forum[] = [];
  constructor(private forumService: ForumService, private dialogService: MatDialog, private userService: AuthenticationService) { }

  ngOnInit(): void {
    this.forumService.getMy().subscribe(
      (response: Forum[]) => {
        this.forums = response;
        this.forums.forEach( forum => {
          this.userService.getUsername(forum.ownerId).subscribe( response => {
            forum.userName=response.name;
          })
        });
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
          this.forums.concat(result);
      });
    });
  }

}
