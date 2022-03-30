import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, skip, Subscription, switchMap } from 'rxjs';
import { validateLatinLettersAndNumbersOnly } from 'src/app/shared/shared.module';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { CourseStoreModel } from 'src/app/store/courses/courses.models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  courseForm : FormGroup;
  id!: string;
  isCreatePage!: boolean;

  addedAuthorSubscription!: Subscription;
  getCourseSubscription!: Subscription;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade) {
    this.courseForm = new FormGroup({
      "title" : new FormControl("", [Validators.required]),
      "description" : new FormControl("", [Validators.required]),
      "duration" : new FormControl("", [Validators.required, Validators.min(1)]),
      "authors" : new FormArray([], [Validators.required]),
      "newAuthor" : new FormGroup({
           "authorName" : new FormControl("", [validateLatinLettersAndNumbersOnly])
         })
    });
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isCreatePage = !this.id;

    this.addedAuthorSubscription = this.authorsStateFacade.addedAuthor$.pipe(skip(1)).subscribe((author) => {
      if (author) {
        this.authors.push(new FormControl({id: author.id, name: author.name}));
        this.newAuthorName.setValue("");
      }
    });

    if(!this.isCreatePage) {
        this.coursesStateFacade.getSingleCourse(this.id);

        this.getCourseSubscription = this.coursesStateFacade.isSingleCourseLoading$.pipe(
            filter(isLoading => isLoading === false),
            switchMap(() => this.coursesStateFacade.course$)
          ).subscribe((course) => {
            if(course) {
              this.courseForm.patchValue(course);
              this.authors.clear();
              course.authors.forEach(author => this.authors.push(new FormGroup({
                "id": new FormControl(author.id),
                "name": new FormControl(author.name)
              })))
            }
          });
    }
  }

  ngOnDestroy(): void {
    this.addedAuthorSubscription?.unsubscribe();
    this.getCourseSubscription?.unsubscribe();
  }

  get title() : FormControl {
    return this.courseForm.controls['title'] as FormControl;
  }

  get description() : FormControl {
    return this.courseForm.controls['description'] as FormControl;
  }

  get newAuthorName() : FormControl {
    return this.courseForm.get('newAuthor.authorName') as FormControl;
  }

  get duration() : FormControl {
    return this.courseForm.controls['duration'] as FormControl;
  }

  get authors() : FormArray {
    return this.courseForm.controls['authors'] as FormArray;
  }

  onSubmit() {
    if(this.courseForm.valid) {
      let course: CourseStoreModel = {
        id: this.id?? '',
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        creationDate: '',
        duration: this.courseForm.value.duration,
        authors: (this.courseForm.value.authors as Array<any>).map(x => ({id: x.id, name: x.name}))
      };

      if(!this.isCreatePage) {
        this.coursesStateFacade.editCourse(course);
      } else {
        this.coursesStateFacade.createCourse(course);
      }
    }   
  }

  onAddAuthor() {
    if(this.newAuthorName.valid 
      && this.newAuthorName.value !== "" 
      && !this.authors.controls.find(x => x.value.name === this.newAuthorName.value)) {
        this.authorsStateFacade.addAuthor({id: '', name:  this.newAuthorName.value});
    }
  }

  onDeleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }
}
