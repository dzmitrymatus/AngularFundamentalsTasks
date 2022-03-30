import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { CourseStoreModel } from 'src/app/store/courses/courses.models';
import { CourseDetailsModel } from '../../models/course.models';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<CourseDetailsModel|null> = this.mapCoursesToViewModel(this.coursesStateFacade.course$);

  constructor(private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.coursesStateFacade.getSingleCourse(id);
  }

  mapCoursesToViewModel(course$: Observable<CourseStoreModel|null>): Observable<CourseDetailsModel | null> {
    return course$.pipe(
              map((course) => course? ({
                    ...course, 
                    creationDate: new Date(course.creationDate), 
                    authors: course.authors.map(author => author.name)
                  }) : null                
              )
            );
  }

}
