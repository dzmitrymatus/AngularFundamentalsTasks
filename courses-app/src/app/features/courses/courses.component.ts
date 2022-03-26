import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, mergeMap, Observable, Subscription, switchMap } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { AuthorModel } from 'src/app/services/authors/authors.models';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { CourseModel } from 'src/app/services/courses/courses.models';
import { UserFacade } from 'src/app/user/store/user.facade';
import { CourseCardModel } from './models/course-card.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CourseCardModel[] = [];
  editable$: Observable<boolean> = this.userFacade.isAdmin$;
  isSearch: boolean = false;

  constructor(private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private userFacade: UserFacade,
    private router: Router) { }

  ngOnInit(): void {
    this.coursesStoreService.getAll()
      .subscribe(() => this.authorsStoreService.getAll()
        .subscribe(() => this.mapCourses(this.coursesStoreService.courses$, this.authorsStoreService.authors$)
            .subscribe(data => this.courses = data)));
  }

  onShowClick(id: string) {
    this.router.navigateByUrl(`course/${id}`);
  }

  onEditClick(id: string) {
    this.router.navigateByUrl(`course/edit/${id}`);
  }

  onRemoveClick(id: string) {
    this.coursesStoreService.deleteCourse(id)
      .subscribe();
  }

  onSearchClick(text: string) {
    if(text) {
      this.isSearch = true;
    } else {
      this.isSearch = false;
    }
    this.coursesStoreService.searchCourse(text);
  }

  mapCourses(courses$: Observable<CourseModel[]>, authors$: Observable<AuthorModel[]>): Observable<CourseCardModel[]> {
    return combineLatest({courses: courses$, authors: authors$})
      .pipe(
          map(({courses, authors}) => { 
            return courses.map(value => { return {
              id: value.id,
              title: value.title,
              description: value.description,
              creationDate: new Date(value.creationDate),
              duration: value.duration,
              authors: value.authors.map(author => authors.find(x => x.id === author)?.name)
          } as CourseCardModel})})
        );
  }

}
