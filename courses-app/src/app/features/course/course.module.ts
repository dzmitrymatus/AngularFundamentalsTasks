import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';



@NgModule({
  declarations: [
    CourseComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CourseComponent
  ]
})
export class CourseModule { }
