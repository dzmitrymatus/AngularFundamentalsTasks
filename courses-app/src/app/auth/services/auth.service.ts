import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthModel } from './auth.models';
import { SessionStorageService } from './session-storage.service';
import { Response } from 'src/app/models/server.models';
import { UserFacade } from 'src/app/user/store/user.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private userFacade: UserFacade) { }

  login(userAuthModel: UserAuthModel): Observable<string> {
    return this.http.post<Response<string>>(environment.apiConfig.loginUrl, userAuthModel)
      .pipe(
        tap((data) => {
          this.sessionStorageService.setToken(data.result);
          this.isAuthorized$$.next(true);
          this.userFacade.getCurrentUser();  
        }),
        map((data) => data.result)
      );
  }

  logout(): Observable<any> {
    let token = this.sessionStorageService.getToken() ?? "";

    return this.http.delete<any>(environment.apiConfig.logoutUrl, {headers: {Authorization : token}})
      .pipe(
        tap(() => {
          this.sessionStorageService.deleteToken();
          this.isAuthorized$$.next(false)
          })
      );
  }

  register(userAuthModel: UserAuthModel): Observable<UserAuthModel> {
    return this.http.post<any>(environment.apiConfig.registerUrl, userAuthModel)
      .pipe(
        map(() => { return userAuthModel })
      );
  }
}
