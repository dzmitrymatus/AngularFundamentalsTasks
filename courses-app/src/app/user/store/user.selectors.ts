import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducer";

export const selectFeature = createFeatureSelector<UserState>(userFeatureKey);

export const getName = createSelector(
    selectFeature,
    (state: UserState) => state.name
);

export const isAdmin = createSelector(
    selectFeature,
    (state: UserState) => state.isAdmin
);