import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthModel } from './auth.models';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(userAuthModel: UserAuthModel) {
    this.http.post<any>(environment.apiConfig.loginUrl, userAuthModel).subscribe({
      next: (data: any) => 
      { 
        this.sessionStorageService.setToken(data.result);
        this.isAuthorized$$.next(true) 
      },
      error: (error) => { console.log(`error: ${error}`); this.isAuthorized$$.next(false) }
    });
  }

  logout() {
    let token = this.sessionStorageService.getToken();

    if(this.isAuthorized$$.value === true && token) {         
      this.http.delete<any>(environment.apiConfig.logoutUrl, {headers: {Authorization : token}}).subscribe({
        next: (data: any) => 
        { 
          this.sessionStorageService.deleteToken();
          this.isAuthorized$$.next(false) 
        },
        error: (error) => { console.log(`error: ${error}`); }
      });
    }
  }

  register(userAuthModel: UserAuthModel) {
    this.http.post<any>(environment.apiConfig.registerUrl, userAuthModel).subscribe({
      next: (data: any) => 
      { 
        this.sessionStorageService.setToken(data.result);
        this.isAuthorized$$.next(true) 
      },
      error: (error) => { console.log(`error: ${error}`); this.isAuthorized$$.next(false) }
    });
  }
}
