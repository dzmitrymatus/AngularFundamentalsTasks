import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailsComponent } from './components/course-details/course-details.component';



@NgModule({
  declarations: [
    CourseComponent,
    CourseFormComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutingModule
  ],
  exports: [
    CourseComponent
  ]
})
export class CourseModule { }
