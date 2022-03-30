import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthModel } from './auth.models';
import { SessionStorageService } from './session-storage.service';
import { Response } from 'src/app/models/server.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private sessionStorageService: SessionStorageService) { }

  login(userAuthModel: UserAuthModel): Observable<string> {
    return this.http.post<Response<string>>(environment.apiConfig.loginUrl, userAuthModel)
      .pipe(
        tap((data) => {
          this.sessionStorageService.setToken(data.result); 
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
