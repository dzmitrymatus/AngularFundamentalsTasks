import { createAction, props } from "@ngrx/store";
import { UserModel } from "./user.models";

export enum UserActions {
    RequestCurrentUser = '[User Actions] RequestCurrentUser',
    RequestCurrentUserSuccess = '[User Actions] RequestCurrentUserSuccess',
    RequestCurrentUserFail = '[User Actions] RequestCurrentUserFail'
  }

export const requestCurrentUser = createAction(UserActions.RequestCurrentUser);
export const requestCurrentUserSuccess = createAction(UserActions.RequestCurrentUserSuccess, props<{user: UserModel}>());
export const requestCurrentUserFail = createAction(UserActions.RequestCurrentUserFail);