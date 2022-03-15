import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isAuthorized = false;
  userName = "";

  constructor(private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(data => {
       this.isAuthorized = data; 
       if(data) {
         this.userStoreService.getUser();
         this.userStoreService.name$.subscribe(data => this.userName = data);
       } 
      });
  }

  logoutClick() {
    this.authService.logout()
      .subscribe(() => this.router.navigateByUrl("/login"));
  }

}
