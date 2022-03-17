import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, filter, finalize, map, Observable, tap } from 'rxjs';
import { CourseModel } from './courses.models';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private coursesFromServer$$: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);
  private courses$$: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable().pipe(
    map((data) => data.map((item) => {
        let newItem = {...item};
        let date = item.creationDate.split('/');
        newItem.creationDate = `${date[1]}/${date[0]}/${date[2]}`;
        return newItem;
      })
    ));

  constructor(private coursesService: CoursesService) {
    this.coursesFromServer$$.subscribe(data => this.courses$$.next(data));
   }

  getAll(): Observable<CourseModel[]> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.coursesService.getAll().pipe(
        tap((data) => this.coursesFromServer$$.next(data)),
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  getCourse(courseId: string): Observable<CourseModel> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.coursesService.getCourse(courseId).pipe(
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  createCourse(course: CourseModel): Observable<CourseModel> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.coursesService.createCourse(course).pipe(
        tap((data) => {
          let courses = this.courses$$.getValue();
          courses.push(data);
          this.courses$$.next(courses); 
        }),
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  editCourse(course: CourseModel): Observable<string> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.coursesService.editCourse(course).pipe(
        tap((data) => {
          let courses = this.courses$$.getValue();
          let courseToEdit = courses.find(x => x.id === course.id);
          if(courseToEdit) {
            let index = courses.indexOf(courseToEdit);
            courses[index] = course;
            this.courses$$.next(courses); 
          }
        }),
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  deleteCourse(courseId: string): Observable<string> {
    return defer(() => {
      this.isLoading$$.next(true); 
      return this.coursesService.deleteCourse(courseId).pipe(
        tap((data) => {
          let courses = this.courses$$.getValue();
          let courseToDelete = courses.find(x => x.id === courseId);
          if(courseToDelete) {
            let index = courses.indexOf(courseToDelete);
            courses.splice(index, 1);
            this.courses$$.next(courses); 
          }
        }),
        finalize(() => this.isLoading$$.next(false))
    )});
  }

  searchCourse(courseTitle: string) {
    this.courses$$.next(this.coursesFromServer$$.value.filter(value => value.title.startsWith(courseTitle)));
  }
}
