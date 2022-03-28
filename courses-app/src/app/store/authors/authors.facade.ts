import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";
import { AuthorStoreModel } from "./authors.models";
import { AuthorsState } from "./authors.reducer";
import * as AuthorsSelectors from "./authors.selectors";

@Injectable({
  providedIn: 'root',
})
export class AuthorsStateFacade {
  addedAuthor$ = this.store.pipe(select(AuthorsSelectors.getAddedAuthor));
  authors$ = this.store.pipe(select(AuthorsSelectors.getAuthors));

  constructor(private store: Store<AuthorsState>) {}

  getAuthors() {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: AuthorStoreModel) {
    this.store.dispatch(AuthorsActions.requestAddAuthor(author));
  }
}