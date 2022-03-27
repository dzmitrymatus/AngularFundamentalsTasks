import { createAction, props } from "@ngrx/store";
import { UserAuthStoreModel } from "./auth.models";

export enum AuthActions {
    RequestLogin = '[Auth Actions] RequestLogin',
    RequestLoginSuccess = '[Auth Actions] RequestLoginSuccess',
    RequestLoginFail = '[Auth Actions] RequestLoginFail',
    RequestRegister = '[Auth Actions] RequestRegister',
    RequestRegisterSuccess = '[Auth Actions] RequestRegisterSuccess',
    RequestRegisterFail = '[Auth Actions] RequestRegisterFail',
    RequestLogout = '[Auth Actions] RequestLogout',
    RequestLogoutSuccess = '[Auth Actions] RequestLogoutSuccess',
    RequestLogoutFail = '[Auth Actions] RequestLogoutFail',
  }

//login actions
export const requestLogin = createAction(AuthActions.RequestLogin, props<UserAuthStoreModel>());
export const requestLoginSuccess = createAction(AuthActions.RequestLoginSuccess, props<{userToken: string}>());
export const requestLoginFail = createAction(AuthActions.RequestLoginFail, props<{error: string}>());
//register actions
export const requestRegister = createAction(AuthActions.RequestRegister, props<UserAuthStoreModel>());
export const requestRegisterSuccess = createAction(AuthActions.RequestRegisterSuccess, props<UserAuthStoreModel>());
export const requestRegisterFail = createAction(AuthActions.RequestRegisterFail, props<{error: string}>());
//logout actions
export const requestLogout = createAction(AuthActions.RequestLogout);
export const requestLogoutSuccess = createAction(AuthActions.RequestLogoutSuccess);
export const requestLogoutFail = createAction(AuthActions.RequestLogoutFail, props<{error: string}>());