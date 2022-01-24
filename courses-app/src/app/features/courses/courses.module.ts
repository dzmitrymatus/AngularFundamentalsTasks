import { NgModule } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
