import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserStateFacade } from '../store/user.facade';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userStateFacade: UserStateFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.userStateFacade.isAdmin$.pipe(
        map(isAdmin => {
          if(isAdmin) return true
          else return this.router.parseUrl('/courses');
        })
      )
  }
  
}
