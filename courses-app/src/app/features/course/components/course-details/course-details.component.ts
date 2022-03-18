import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { CourseDetailsModel } from '../../models/course.models';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course! : CourseDetailsModel;

  constructor(private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.coursesStoreService.getCourse(id)
        .pipe(
          mergeMap((course) => 
            this.authorsStoreService.authors$
              .pipe(
                map((data) => {
                  return {
                    title: course.title,
                    description: course.description,
                    duration: course.duration,
                    creationDate: new Date(course.creationDate),
                    authors: data.filter(element => course.authors.find(x => x === element.id))
                                .map(author => author.name)
                  } as CourseDetailsModel
                })
              )
          )
        )
        .subscribe(data => this.course = data);
  }

}
