import { createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { CourseStoreModel } from "./courses.models";

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: CourseStoreModel[];
    courses: CourseStoreModel[];
    course: CourseStoreModel | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

const initialState: CoursesState = {
    allCourses: [],
    courses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ""
};

export const coursesReducer = createReducer(
    initialState,
    //Request All Courses actions
    on(CoursesActions.requestAllCourses, (state) => ({...state, isAllCoursesLoading: true})),
    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}) => ({...state, allCourses: courses, courses: courses, isAllCoursesLoading: false, isSearchState: false})),
    on(CoursesActions.requestAllCoursesFail, (state, {errorMessage}) => ({...state, isAllCoursesLoading: false, errorMessage: errorMessage})),
    //Request Filtered Courses actions
    on(CoursesActions.requestFilteredCoursesSuccess, (state, {courses}) => ({...state, courses: courses, isSearchState: true})),
    //Request Create Course actions
    on(CoursesActions.requestCreateCourseSuccess, (state, {course}) => ({...state, course: course, allCourses: [...state.allCourses, course]})),
    on(CoursesActions.requestCreateCourseFail, (state, {errorMessage}) => ({...state, errorMessage: errorMessage})),
    //Request Single Course actions
    on(CoursesActions.requestSingleCourse, (state) => ({...state, isSingleCourseLoading: true})),
    on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({...state, course: course, isSingleCourseLoading: false})),
    on(CoursesActions.requestSingleCourseFail, (state, {errorMessage}) => ({...state, isSingleCourseLoading: false, errorMessage: errorMessage})),
    //Request Edit Course actions
    on(CoursesActions.requestEditCourseSuccess, (state, {course}) => ({...state, allCourses: state.allCourses.map(x => x.id === course.id ? course : x)})),
    on(CoursesActions.requestEditCourseFail, (state, {errorMessage}) => ({...state, errorMessage: errorMessage})),
    //Request Delete Course actions
    on(CoursesActions.requestDeleteCourseSuccess, (state, {courseId}) => ({...state, allCourses: state.allCourses.filter(x => x.id !== courseId)})),
    on(CoursesActions.requestDeleteCourseFail, (state, {errorMessage}) => ({...state, errorMessage: errorMessage})),
);