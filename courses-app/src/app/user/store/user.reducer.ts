import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const userFeatureKey = 'user';

export interface UserState {
    name: string;
    isAdmin: boolean;
}

const initialState: UserState = {
    name: "",
    isAdmin: false
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.requestCurrentUserSuccess, (state, {user}) => ({ name: user.name, isAdmin: user.isAdmin })),
);