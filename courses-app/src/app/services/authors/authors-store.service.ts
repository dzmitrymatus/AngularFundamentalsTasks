import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, finalize, Observable, of, tap } from 'rxjs';
import { AuthorModel } from './authors.models';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  private authors$$: BehaviorSubject<AuthorModel[]> = new BehaviorSubject<AuthorModel[]>([]);
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authors$: Observable<AuthorModel[]> = this.authors$$.asObservable();
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private authorsService: AuthorsService) { }

  getAll(): Observable<AuthorModel[]> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.authorsService.getAll().pipe(
        tap((data) => this.authors$$.next(data)),
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  addAuthor(author: AuthorModel): Observable<AuthorModel> {
    let createdAuthor = this.authors$$.value.find(x => x.name === author.name);
    if(createdAuthor) return of(createdAuthor);

    return defer(() => {
      this.isLoading$$.next(true); 
      return this.authorsService.addAuthor(author).pipe(
        tap((author) => {
          let authors = this.authors$$.getValue();
          authors.push(author);
          this.authors$$.next(authors);
        }),
        finalize(() => this.isLoading$$.next(false))
    )});
  }
}
