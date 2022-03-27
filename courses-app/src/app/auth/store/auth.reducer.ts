import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    isAuthorized: boolean;
    token: string;
    errorMessage: string;
}

const initialState: AuthState = {
    isAuthorized: false,
    token: "",
    errorMessage: ""
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.requestLoginSuccess, (state, {userToken}) => ({...state, isAuthorized: true, token: userToken})),
    on(AuthActions.requestLoginFail, (state, {error}) => ({...state, isAuthorized: false, errorMessage: error})),
    on(AuthActions.requestLogoutSuccess, (state) => (initialState)),
    on(AuthActions.requestLogoutFail, (state, {error}) => ({...state, errorMessage: error})),
    on(AuthActions.requestRegisterFail, (state, {error}) => ({...state, errorMessage: error}))
);