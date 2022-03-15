import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, map, merge, mergeMap, Observable } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { AuthorModel } from 'src/app/services/authors/authors.models';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { CourseModel } from 'src/app/services/courses/courses.models';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { CourseCardModel } from './models/course-card.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CourseCardModel[] = [];
  editable: boolean = false;
  isSearch: boolean = false;

  constructor(private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private userStoreService: UserStoreService) { }

  onShowClick(id: string) {
    console.log("show action");
    //this.selectedCourseId = id;
  }

  onEditClick(id: string) {
    console.log("edit action");
    //this.selectedCourseId = id;
  }

  onRemoveClick(id: string) {
    console.log("delete action" + id);
    //this.selectedCourseId = id;
  }

  onSearchClick(text: string) {
    if(text) {
      this.isSearch = true;
    } else {
      this.isSearch = false;
    }
    this.coursesStoreService.searchCourse(text);
  }

  ngOnInit(): void {
    this.mapCourses(this.coursesStoreService.courses$, this.authorsStoreService.authors$)
      .subscribe(data => this.courses = data);
      this.coursesStoreService.getAll();
      this.authorsStoreService.getAll();

    this.userStoreService.isAdmin$.subscribe(data => this.editable = data);
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
