import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/user/guards/admin.guard';
import { CourseComponent } from './course.component';

const routes: Routes = [
    {
        path: 'add',
        canActivate: [AdminGuard],
        component: CourseComponent
    },
    {
        path: ':id',
        component: CourseComponent
    },
    {
        path: 'edit/:id',
        canActivate: [AdminGuard],
        component: CourseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CourseRoutingModule { }