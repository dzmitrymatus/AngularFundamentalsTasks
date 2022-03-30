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

  isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getFilteredCourses(filter: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({filter}));
  }

  createCourse(course: CourseStoreModel) {
    this.store.dispatch(CoursesActions.requestCreateCourse({course}));
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({courseId: id}));
  }

  editCourse(course: CourseStoreModel) {
    this.store.dispatch(CoursesActions.requestEditCourse({course}));
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({courseId}));
  }
}