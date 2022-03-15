import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CourseModel } from './courses.models';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private coursesFromServer$$: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);
  private courses$$: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public courses$: Observable<CourseModel[]> = this.courses$$.asObservable();
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  
  constructor(private coursesService: CoursesService) {
    this.coursesFromServer$$.subscribe(data => this.courses$$.next(data));
   }

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe({
      next: (data: CourseModel[]) => {
        this.coursesFromServer$$.next(data);
        },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  getCourse(courseId: string) {
    this.isLoading$$.next(true);
    this.coursesService.getCourse(courseId).subscribe({
      next: (data: CourseModel) => { this.courses$$.next([data]) },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  createCourse(course: CourseModel) {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe({
      next: (data: CourseModel) => {
          let courses = this.courses$$.getValue();
          courses.push(data);
          this.courses$$.next(courses); 
        },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  editCourse(course: CourseModel) {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(course).subscribe({
      next: (data: CourseModel) => {
          let courses = this.courses$$.getValue();
          let courseToEdit = courses.find(x => x.id === data.id);
          if(courseToEdit) {
            let index = courses.indexOf(courseToEdit);
            courses[index] = data;
            this.courses$$.next(courses); 
          }
        },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  deleteCourse(courseId: string) {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(courseId).subscribe({
      next: (data: CourseModel) => {
          let courses = this.courses$$.getValue();
          let courseToDelete = courses.find(x => x.id === data.id);
          if(courseToDelete) {
            let index = courses.indexOf(courseToDelete);
            courses.splice(index, 1);
            this.courses$$.next(courses); 
          }
        },
      error: (error) => { console.log(`error: ${error}`); this.isLoading$$.next(false) },
      complete: () => { this.isLoading$$.next(false) } 
    });
  }

  searchCourse(courseTitle: string) {
    this.courses$$.next(this.coursesFromServer$$.value.filter(value => value.title.startsWith(courseTitle)));
  }

}
