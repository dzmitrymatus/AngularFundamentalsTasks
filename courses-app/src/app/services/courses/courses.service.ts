import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseModel } from './courses.models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(environment.apiConfig.coursesUrl);
  }

  getCourse(courseId: string): Observable<CourseModel> {
    return this.http.get<CourseModel>(environment.apiConfig.courseUrl, {params: {id : courseId}});
  }

  createCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(environment.apiConfig.postCourseUrl, course);
  }

  editCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.put<CourseModel>(environment.apiConfig.courseUrl, course, {params: {id : course.id}});
  }

  deleteCourse(courseId: string): Observable<CourseModel> {
    return this.http.delete<CourseModel>(environment.apiConfig.courseUrl, {params: {id : courseId}});
  }
}
