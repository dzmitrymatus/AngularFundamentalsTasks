import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from './user.models';
import { Response } from 'src/app/models/server.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<Response<UserModel>>(environment.apiConfig.userUrl)
      .pipe(map(data => data.result));
  }
}
