import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorModel } from './authors.models';
import { Response } from 'src/app/models/server.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AuthorModel[]> {
    return this.http.get<Response<AuthorModel[]>>(environment.apiConfig.getAuthorsUrl)
      .pipe(map(data => data.result));
  }

  addAuthor(author: AuthorModel): Observable<AuthorModel> {
    return this.http.post<Response<AuthorModel>>(environment.apiConfig.postAuthorUrl, author)
    .pipe(map(data => data.result));
  }
}
