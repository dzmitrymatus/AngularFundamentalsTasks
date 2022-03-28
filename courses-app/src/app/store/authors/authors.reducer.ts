import { createReducer, on } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";
import { AuthorStoreModel } from "./authors.models";

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
    authors: AuthorStoreModel[];
    addedAuthor: AuthorStoreModel | null;
}

const initialState: AuthorsState = {
    authors: [],
    addedAuthor: null
};

export const authorsReducer = createReducer(
    initialState,
    on(AuthorsActions.requestAuthorsSuccess, (state, {authors}) => ({...state, authors: authors})),
    on(AuthorsActions.requestAuthorsFail, (state) => state),
    on(AuthorsActions.requestAddAuthorSuccess, (state, {author}) => ({...state, addedAuthor: author})),
    on(AuthorsActions.requestAddAuthorFail, (state) => ({...state, addedAuthor: null})),
    on(AuthorsActions.resetAddedAuthor, (state) => ({...state, addedAuthor: null}))
);