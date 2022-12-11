import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Forum } from '../Dtos/Post';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-all-forum',
  templateUrl: './all-forum.component.html',
  styleUrls: ['./all-forum.component.css']
})
export class AllForumComponent implements OnInit {
  forums: Forum[] = [];
  constructor(private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {
    this.forumService.getAll().subscribe(
      (response: Forum[]) => {
        this.forums = response;
      }
    )
  }

  public joinForum(forumId: string){
    this.forumService.joinForum(localStorage.getItem('id')!, forumId).subscribe(
      () => {
        this.router.navigate(['/forum',forumId]);
      }
    );
    
  }

}
