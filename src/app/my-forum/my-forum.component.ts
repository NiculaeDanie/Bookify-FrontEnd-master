import { Component, OnInit } from '@angular/core';
import { Forum } from '../Dtos/Post';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-my-forum',
  templateUrl: './my-forum.component.html',
  styleUrls: ['./my-forum.component.css']
})
export class MyForumComponent implements OnInit {
  forums: Forum[] = [];
  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getMy().subscribe(
      (response: Forum[]) => {
        this.forums = response;
      }
    );
  }

}
