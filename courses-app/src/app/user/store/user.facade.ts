import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { requestCurrentUser } from "./user.actions";
import { UserState } from "./user.reducer";
import * as UserSelectors from "./user.selectors";

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  name$ = this.store.pipe(select(UserSelectors.getName));
  isAdmin$ = this.store.pipe(select(UserSelectors.isAdmin));

  constructor(private store: Store<UserState>) {}

  getCurrentUser() {
    this.store.dispatch(requestCurrentUser());
  }
}