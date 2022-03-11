import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorModel } from './authors.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(environment.apiConfig.getAuthorsUrl);
  }

  addAuthor(author: AuthorModel): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(environment.apiConfig.postAuthorUrl, author);
  }
}
