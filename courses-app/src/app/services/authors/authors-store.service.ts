import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getAll(){
    this.isLoading$$.next(true);
    this.authorsService.getAll().subscribe({
      next: (data: AuthorModel[]) => { this.authors$$.next(data) },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  addAuthor(author: AuthorModel) {
    this.isLoading$$.next(true);
    this.authorsService.addAuthor(author).subscribe({
      next: (data: AuthorModel) => {
          let authors = this.authors$$.getValue();
          authors.push(data);
          this.authors$$.next(authors); 
        },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }
}
