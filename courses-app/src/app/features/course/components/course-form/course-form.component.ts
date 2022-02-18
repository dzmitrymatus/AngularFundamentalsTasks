import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateValueContainsLatinLettersAndNumbersOnly } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm : FormGroup;
  newAuthor : FormGroup;
  
  constructor() {
    this.courseForm = new FormGroup({
      "title" : new FormControl("", [Validators.required]),
      "description" : new FormControl("", [Validators.required]),
      "duration" : new FormControl("", [Validators.required, Validators.min(1)]),
      "authors" : new FormArray([], [Validators.required])
    });

    this.newAuthor = new FormGroup({
      "authorName" : new FormControl("", [validateValueContainsLatinLettersAndNumbersOnly])
    });
   }

  ngOnInit(): void {
  }

  get title() : FormControl {
    return this.courseForm.controls['title'] as FormControl;
  }

  get description() : FormControl {
    return this.courseForm.controls['description'] as FormControl;
  }

  get newAuthorName() : FormControl {
    return this.newAuthor.controls['authorName'] as FormControl;
  }

  get duration() : FormControl {
    return this.courseForm.controls['duration'] as FormControl;
  }

  get authors() : FormArray {
    return this.courseForm.controls['authors'] as FormArray;
  }

  onSubmit() {
    if(this.courseForm.valid) {
      console.log(this.courseForm.value);
    }   
  }

  onAddAuthor() {
    if(this.newAuthor.valid && this.newAuthorName.value !== "") {
      this.authors.push(new FormControl(this.newAuthorName.value));
      this.newAuthorName.setValue("");
    }
  }

  onDeleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }
}
