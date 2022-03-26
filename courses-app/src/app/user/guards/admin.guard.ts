import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserFacade } from '../store/user.facade';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userFacade: UserFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.userFacade.isAdmin$.pipe(
        map(isAdmin => {
          if(isAdmin) return true
          else return this.router.parseUrl('/courses');
        })
      )
  }
  
}
