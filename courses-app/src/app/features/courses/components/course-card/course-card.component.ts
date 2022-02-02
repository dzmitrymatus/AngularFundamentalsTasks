import { Component, Input, OnInit } from '@angular/core';
import { CourseCardModel } from '../../models/course-card.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: CourseCardModel | undefined;
  // @Input() title: string = "";
  // @Input() description: string = "";
  // @Input() creationDate?: Date;
  // @Input() duration: number = 0;
  // @Input() authors: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
