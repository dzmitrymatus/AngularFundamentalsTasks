import { ActionReducerMap } from "@ngrx/store";
import { AuthorsEffects } from "./authors/authors.effects";
import { authorsReducer, AuthorsState, authorsFeatureKey } from "./authors/authors.reducer";
import { CoursesEffects } from "./courses/courses.effects";
import { coursesReducer, CoursesState, coursesFeatureKey} from "./courses/courses.reducer";

export interface AppState {
  [coursesFeatureKey]: CoursesState,
  [authorsFeatureKey]: AuthorsState
 }

export const reducers: ActionReducerMap<AppState> = {
  [coursesFeatureKey]: coursesReducer,
  [authorsFeatureKey]: authorsReducer
  };

export const effects = [CoursesEffects, AuthorsEffects];