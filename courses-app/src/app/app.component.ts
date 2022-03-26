import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { UserFacade } from './user/store/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isAuthorized$: Observable<boolean> = this.authService.isAuthorized$;
  userName$ = this.userFacade.name$;

  constructor(private authService: AuthService,
    private userFacade: UserFacade,
    private router: Router) { }

  ngOnInit(): void {
  }

  logoutClick() {
    this.authService.logout()
      .subscribe(() => this.router.navigateByUrl("/login"));
  }

}
