import { CourseCardModel } from "../../models/course-card.model"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() courses: CourseCardModel[] = [];
  @Input() editable: boolean = false;

  @Output() onShow = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onRemove = new EventEmitter<number>();

  constructor() { }
  
  ngOnInit(): void {
  }

}
