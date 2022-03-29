import { createAction, props } from "@ngrx/store";
import { CourseStoreModel } from "./courses.models";

export enum CoursesActions {
    RequestAllCourses = '[CoursesActions] RequestAllCourses',
    RequestAllCoursesSuccess = '[CoursesActions] RequestAllCoursesSuccess',
    RequestAllCoursesFail = '[CoursesActions] RequestAllCoursesFail',
    RequestFilteredCourses = '[CoursesActions] RequestFilteredCourses',
    RequestFilteredCoursesSuccess = '[CoursesActions] RequestFilteredCoursesSuccess',
    RequestCreateCourse = '[CoursesActions] RequestCreateCourse',
    RequestCreateCourseSuccess = '[CoursesActions] RequestCreateCourseSuccess',
    RequestCreateCourseFail = '[CoursesActions] RequestCreateCourseFail',
    RequestSingleCourse = '[CoursesActions] RequestSingleCourse',
    RequestSingleCourseSuccess = '[CoursesActions] RequestSingleCourseSuccess',
    RequestSingleCourseFail = '[CoursesActions] RequestSingleCourseFail',
    RequestEditCourse = '[CoursesActions] RequestEditCourse',
    RequestEditCourseSuccess = '[CoursesActions] RequestEditCourseSuccess',
    RequestEditCourseFail = '[CoursesActions] RequestEditCourseFail',
    RequestDeleteCourse = '[CoursesActions] RequestDeleteCourse',
    RequestDeleteCourseFail = '[CoursesActions] RequestDeleteCourseFail'
  }

//Request All Courses actions
export const requestAllCourses = createAction(CoursesActions.RequestAllCourses);
export const requestAllCoursesSuccess = createAction(CoursesActions.RequestAllCoursesSuccess, props<{courses: CourseStoreModel[]}>());
export const requestAllCoursesFail = createAction(CoursesActions.RequestAllCoursesFail);
//Request Filtered Courses actions
export const requestFilteredCourses = createAction(CoursesActions.RequestFilteredCourses, props<{filter: string}>());
export const requestFilteredCoursesSuccess = createAction(CoursesActions.RequestFilteredCoursesSuccess, props<{courses: CourseStoreModel[]}>());
//Request Create Course actions
export const requestCreateCourse = createAction(CoursesActions.RequestCreateCourse, props<{course: CourseStoreModel}>());
export const requestCreateCourseSuccess = createAction(CoursesActions.RequestCreateCourseSuccess, props<{course: CourseStoreModel}>());
export const requestCreateCourseFail = createAction(CoursesActions.RequestCreateCourseFail);
//Request Single Course actions
export const requestSingleCourse = createAction(CoursesActions.RequestSingleCourse, props<{courseId: string}>());
export const requestSingleCourseSuccess = createAction(CoursesActions.RequestSingleCourseSuccess, props<{course: CourseStoreModel}>());
export const requestSingleCourseFail = createAction(CoursesActions.RequestSingleCourseFail);
//Request Edit Course actions
export const requestEditCourse = createAction(CoursesActions.RequestEditCourse, props<{course: CourseStoreModel}>());
export const requestEditCourseSuccess = createAction(CoursesActions.RequestEditCourseSuccess, props<{course: CourseStoreModel}>());
export const requestEditCourseFail = createAction(CoursesActions.RequestEditCourseFail);
//Request Delete Course actions
export const requestDeleteCourse = createAction(CoursesActions.RequestDeleteCourse, props<{courseId: string}>());
export const requestDeleteCourseFail = createAction(CoursesActions.RequestDeleteCourseFail);