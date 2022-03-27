import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateFacade } from './auth/store/auth.facade';
import { UserStateFacade } from './user/store/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isAuthorized$: Observable<boolean> = this.authStateFacade.isAuthorized$;
  userName$ = this.userStateFacade.name$;

  constructor(private router: Router,
    private authStateFacade: AuthStateFacade,
    private userStateFacade: UserStateFacade
    ) { }

  ngOnInit(): void {
  }

  logoutClick() {
    this.authStateFacade.logout();
  }

}
