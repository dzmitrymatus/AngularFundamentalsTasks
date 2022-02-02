import { Component, OnInit } from '@angular/core';
import { CoursesMockData } from './courses.mock.data';
import { CourseCardModel } from './models/course-card.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = new CoursesMockData().courses;
  selectedCourseId:number = 0;

  constructor() { }

  onShowId(id: number){
    this.selectedCourseId = id;
  }

  ngOnInit(): void {
  }

}
