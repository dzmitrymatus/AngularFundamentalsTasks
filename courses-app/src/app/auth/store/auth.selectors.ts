import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

export const selectFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const isUserAuthorized = createSelector(
    selectFeature,
    (state: AuthState) => state.isAuthorized
);

export const getToken = createSelector(
    selectFeature,
    (state: AuthState) => state.token
);

export const getSpecificErrorMessage = createSelector(
    selectFeature,
    (state: AuthState, props: {errorMessageType: string}) => `[${props.errorMessageType}] ${state.errorMessage}`
);