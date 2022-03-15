import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/user/guards/admin.guard';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children: [
            {
                path: 'add',
                canActivate: [AdminGuard],
                component: CourseFormComponent
            },
            {
                path: ':id',
                component: CourseComponent
            },
            {
                path: 'edit/:id',
                canActivate: [AdminGuard],
                component: CourseFormComponent
            }
        ]  
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CourseRoutingModule { }