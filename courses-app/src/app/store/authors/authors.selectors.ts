import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authorsFeatureKey, AuthorsState } from "./authors.reducer";

export const selectFeature = createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const getAuthors = createSelector(
    selectFeature,
    (state: AuthorsState) => state.authors
);

export const getAddedAuthor = createSelector(
    selectFeature,
    (state: AuthorsState) => state.addedAuthor
);