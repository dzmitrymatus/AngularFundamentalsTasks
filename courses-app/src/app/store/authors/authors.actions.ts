import { createAction, props } from "@ngrx/store";
import { AuthorStoreModel } from "./authors.models";

export enum AuthorsActions {
    RequestAuthors = '[AuthorsActions] RequestAuthors',
    RequestAuthorsSuccess = '[AuthorsActions] RequestAuthorsSuccess',
    RequestAuthorsFail = '[AuthorsActions] RequestAuthorsFail',
    RequestAddAuthor = '[AuthorsActions] RequestAddAuthor',
    RequestAddAuthorSuccess = '[AuthorsActions] RequestAddAuthorSuccess',
    RequestAddAuthorFail = '[AuthorsActions] RequestAddAuthorFail',
    ResetAddedAuthor = '[AuthorsActions] ResetAddedAuthor',
  }

//Request Authors actions
export const requestAuthors = createAction(AuthorsActions.RequestAuthors);
export const requestAuthorsSuccess = createAction(AuthorsActions.RequestAuthorsSuccess, props<{authors: AuthorStoreModel[]}>());
export const requestAuthorsFail = createAction(AuthorsActions.RequestAuthorsFail);
//Add Author actions
export const requestAddAuthor = createAction(AuthorsActions.RequestAddAuthor, props<AuthorStoreModel>());
export const requestAddAuthorSuccess = createAction(AuthorsActions.RequestAddAuthorSuccess, props<AuthorStoreModel>());
export const requestAddAuthorFail = createAction(AuthorsActions.RequestAddAuthorFail);
//Reset Added Author actions
export const resetAddedAuthor = createAction(AuthorsActions.ResetAddedAuthor);