import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { CourseModel } from 'src/app/services/courses/courses.models';
import { validateLatinLettersAndNumbersOnly } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm : FormGroup;
  id!: string;
  isCreatePage!: boolean;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService) {
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

    if(!this.isCreatePage) {
      this.coursesStoreService.getCourse(this.id)
        .pipe(
          mergeMap((course) => 
            this.authorsStoreService.authors$
              .pipe(
                map((data) => {
                  return {
                    title: course.title,
                    description: course.description,
                    duration: course.duration,
                    authors: data.filter(element => course.authors.find(x => x === element.id))
                  }
                })
              )
          )
        )
        .subscribe((course) => {
          this.courseForm.patchValue(course);
          course.authors.forEach(author => this.authors.push(new FormGroup({
            "id": new FormControl(author.id),
            "name": new FormControl(author.name)
          })));
        }); 
    }
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
      let observable: Observable<any>;
      let course: CourseModel = {
        id: '',
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        creationDate: '',
        duration: this.courseForm.value.duration,
        authors: (this.courseForm.value.authors as Array<any>).map(x => x.id)
      };

      if(!this.isCreatePage) {
        course.id = this.id;
        observable = this.coursesStoreService.editCourse(course);
      } else {
        observable = this.coursesStoreService.createCourse(course);
      }

      observable.subscribe(data => this.router.navigateByUrl('/courses'));
    }   
  }

  onAddAuthor() {
    if(this.newAuthorName.valid 
      && this.newAuthorName.value !== "" 
      && !this.authors.controls.find(x => x.value.name === this.newAuthorName.value)) {
      this.authorsStoreService.addAuthor({id: '', name:  this.newAuthorName.value})
        .subscribe((author) => {
          this.authors.push(new FormControl({id: author.id, name: author.name}));
          this.newAuthorName.setValue("");
        });
    }
  }

  onDeleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }
}
