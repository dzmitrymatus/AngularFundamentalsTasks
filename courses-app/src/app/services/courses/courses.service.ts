import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from 'src/app/models/server.models';
import { environment } from 'src/environments/environment';
import { CourseModel } from './courses.models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CourseModel[]> {
    return this.http.get<Response<CourseModel[]>>(environment.apiConfig.coursesUrl)
      .pipe(map(data => data.result));
  }

  getCourse(courseId: string): Observable<CourseModel> {
    return this.http.get<Response<CourseModel>>(`${environment.apiConfig.courseUrl}/${courseId}`)
      .pipe(map(data => data.result));
  }

  createCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.post<Response<CourseModel>>(environment.apiConfig.postCourseUrl, course)
      .pipe(map(data => data.result));
  }

  editCourse(course: CourseModel): Observable<string> {
    return this.http.put<Response<string>>(`${environment.apiConfig.courseUrl}/${course.id}`, course)
    .pipe(map(data => data.result));
  }

  deleteCourse(courseId: string): Observable<string> {
    return this.http.delete<Response<string>>(`${environment.apiConfig.courseUrl}/${courseId}`)
    .pipe(map(data => data.result));
  }
}
