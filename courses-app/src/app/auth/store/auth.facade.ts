import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SessionStorageService } from "../services/session-storage.service";
import * as AuthActions from "./auth.actions";
import { UserAuthStoreModel } from "./auth.models";
import { AuthState } from "./auth.reducer";
import * as AuthSelectors from "./auth.selectors";

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  
  isAuthorized$ = this.store.pipe(select(AuthSelectors.isUserAuthorized));
  getToken$ = this.store.pipe(select(AuthSelectors.getToken));
  getLoginErrorMessage$ = this.store.pipe(select(AuthSelectors.getSpecificErrorMessage, {errorMessageType: "Login"}));
  getRegisterErrorMessage$ = this.store.pipe(select(AuthSelectors.getSpecificErrorMessage, {errorMessageType: "Register"}));

  constructor(private store: Store<AuthState>,
    private sessionStorageService: SessionStorageService) {}

  login(user: UserAuthStoreModel) {
    this.store.dispatch(AuthActions.requestLogin(user));
  }

  register(user: UserAuthStoreModel) {
    this.store.dispatch(AuthActions.requestRegister(user));
  }

  logout() {
    this.store.dispatch(AuthActions.requestLogout());
  }

  closeSession() {
    this.store.dispatch(AuthActions.requestLogoutSuccess());
  }

  setAuthorization() {
    this.store.dispatch(AuthActions.requestLoginSuccess({userToken: this.sessionStorageService.getToken() ?? ""}));
  }

}