import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { CourseStoreModel } from "./courses.models";
import { CoursesState } from "./courses.reducer";
import * as CoursesSelectors from "./courses.selectors";

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }
}