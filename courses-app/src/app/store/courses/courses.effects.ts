import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap} from 'rxjs/operators';
import * as CoursesActions from "./courses.actions";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { CoursesService } from "src/app/services/courses/courses.service";
import { AuthorStoreModel } from "../authors/authors.models";
import { CoursesStateFacade } from "./courses.facade";
import { CourseStoreModel } from "./courses.models";
import { CourseModel } from "src/app/services/courses/courses.models";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoursesEffects { 

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestAllCourses),
        mergeMap(() => this.coursesService.getAll()
          .pipe(
            mergeMap(courses => this.authorsStateFacade.authors$.pipe(
                map((authors: AuthorStoreModel[]) => {
                    let coursesStore = courses.map((course) => this.MapCourseToCourseStore(course, authors));
                    return CoursesActions.requestAllCoursesSuccess({ courses: coursesStore })
                })
            )),
            catchError((error) => of(CoursesActions.requestAllCoursesFail({errorMessage: error})))
          ))
        )
    );

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestFilteredCourses),
        mergeMap((payload) => this.coursesStateFacade.allCourses$
          .pipe(
            map(courses => payload.filter !== ""? 
                  CoursesActions.requestFilteredCoursesSuccess({
                    courses: courses.filter(value => value.title.startsWith(payload.filter))
                  }) :
                  CoursesActions.requestAllCoursesSuccess({courses: courses})
            )
          ))
        )
    );

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestCreateCourse),
        mergeMap((payload) => this.coursesService.createCourse(this.MapCourseStoreToCourse(payload.course))
          .pipe(
            map((createdCourse) => CoursesActions.requestCreateCourseSuccess({course: {...payload.course, id: createdCourse.id}})),
            catchError((error) => of(CoursesActions.requestCreateCourseFail({errorMessage: error})))
          ))
        )
    );

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestSingleCourse),
        mergeMap((payload) => this.coursesService.getCourse(payload.courseId)
          .pipe(
            mergeMap(course => this.authorsStateFacade.authors$.pipe(
                map((authors: AuthorStoreModel[]) => CoursesActions.requestSingleCourseSuccess({course: this.MapCourseToCourseStore(course, authors)}))
            )),
            catchError((error) => of(CoursesActions.requestSingleCourseFail({errorMessage: error})))
          ))
        )
    );

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestEditCourse),
        mergeMap((payload) => this.coursesService.editCourse(this.MapCourseStoreToCourse(payload.course))
          .pipe(
            map((editedCourse) => CoursesActions.requestEditCourseSuccess({course: payload.course})),
            catchError((error) => of(CoursesActions.requestEditCourseFail({errorMessage: error})))
          ))
        )
    );

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestDeleteCourse),
        mergeMap((payload) => this.coursesService.deleteCourse(payload.courseId)
          .pipe(
            map((deletedCourse) => CoursesActions.requestDeleteCourseSuccess({courseId: payload.courseId})),
            catchError((error) => of(CoursesActions.requestDeleteCourseFail({errorMessage: error})))
          ))
        )
    );

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestCreateCourseSuccess, 
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail),
        tap(() => this.router.navigateByUrl('/courses'))),
        { dispatch: false }    
    );

    constructor(private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private authorsStateFacade: AuthorsStateFacade,
        private router: Router
      ) {}

    private MapCourseToCourseStore(course: CourseModel, authors: AuthorStoreModel[]): CourseStoreModel  {
      let date = course.creationDate.split('/');
      return {
          ...course,
          creationDate: `${date[1]}/${date[0]}/${date[2]}`,
          authors: authors.filter(author => course.authors.some(x => x === author.id))
          };
    }

    private MapCourseStoreToCourse(course: CourseStoreModel): CourseModel  {
        return {
            ...course, 
            authors: course.authors.map(author => author.id)
            };
    }
}
