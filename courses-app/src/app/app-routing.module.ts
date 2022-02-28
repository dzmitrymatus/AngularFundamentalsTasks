import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'registration',
        loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule)
    },
    {
        path: 'courses',
        pathMatch: 'full',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
    },
    {
        path: 'courses',
        loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/courses'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

  })
  export class AppRoutingModule { }