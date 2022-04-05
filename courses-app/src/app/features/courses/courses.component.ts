import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { CourseStoreModel } from 'src/app/store/courses/courses.models';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { CourseCardModel } from './models/course-card.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CourseCardModel[]> = this.mapCoursesToViewModel(this.coursesStateFacade.courses$);
  editable$: Observable<boolean> = this.userStateFacade.isAdmin$;
  isSearch$: Observable<boolean> = this.coursesStateFacade.isSearchingState$;

  constructor(private router: Router,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private userStateFacade: UserStateFacade
    ) { }

  ngOnInit(): void {
    this.authorsStateFacade.getAuthors();
    this.coursesStateFacade.getAllCourses();
  }

  onShowClick(id: string) {
    this.router.navigateByUrl(`course/${id}`);
  }

  onEditClick(id: string) {
    this.router.navigateByUrl(`course/edit/${id}`);
  }

  onRemoveClick(id: string) {
    this.coursesStateFacade.deleteCourse(id);
  }

  onSearchClick(text: string) {
    this.coursesStateFacade.getFilteredCourses(text);
  }

  mapCoursesToViewModel(courses$: Observable<CourseStoreModel[]>): Observable<CourseCardModel[]> {
    return courses$.pipe(
              map((courses) => courses.map(
                course => ({
                    ...course, 
                    creationDate: new Date(course.creationDate), 
                    authors: course.authors.map(author => author.name)
                  })
                )
              )
            );
  }

}
