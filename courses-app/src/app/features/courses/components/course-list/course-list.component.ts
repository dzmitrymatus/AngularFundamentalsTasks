import { CourseCardModel } from "../../models/course-card.model"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() courses: CourseCardModel[] | null = [];
  @Input() editable: boolean | null = false;

  @Output() onShow = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  constructor() { }
  
  ngOnInit(): void {
  }

}
