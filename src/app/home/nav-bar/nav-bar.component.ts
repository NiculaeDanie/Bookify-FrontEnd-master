import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  public logOut(){
    this.auth.logOut();
    this.router.navigate(['']);
  }
  public Search(event: any): void{
    
  }
  
  

}
