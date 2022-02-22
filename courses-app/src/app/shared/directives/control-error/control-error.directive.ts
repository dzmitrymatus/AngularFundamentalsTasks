import { Directive, Input, OnInit, Optional, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { filter, map, merge, Observable } from 'rxjs';

declare type StateMatcher = (control: FormControl, form:
  FormGroupDirective | NgForm) => boolean;

@Directive({
  selector: '[appControlError]'
})
export class ControlErrorDirective implements OnInit {
  @Input() controlName: string = '';
  @Input() element!: HTMLElement;
  @Input() stateMatcher: StateMatcher = this.getDefaultStateMatcher();
  @Input() errorsDescription: any = this.getDefaultErrorsDescription();
  @Input() set appControlError(control: FormControl | NgModel | string) {
    this.control = control as FormControl | NgModel;
  }

  control!: FormControl | NgModel;
  form!: FormGroupDirective | NgForm;
  formControl!: FormControl;
  error$!: Observable<string>;

  constructor(@SkipSelf() @Optional() private formGroupDirective: FormGroupDirective,
      @SkipSelf() @Optional() private ngForm: NgForm,
      private templateRef: TemplateRef<any>,
      private viewContainerRef: ViewContainerRef) {
    if(formGroupDirective) {
      this.form = formGroupDirective;
    } else {
      this.form = ngForm;
    }
  }

  ngOnInit() {
    if(!this.control) {
      this.formControl = this.form.control.controls[this.controlName] as FormControl;
    } else {
      this.formControl = this.control instanceof NgModel? this.control.control : this.control;
    }

    this.error$ = merge(this.formControl.valueChanges, this.form.ngSubmit)
                .pipe(map(() => this.mapErrors()));

    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.error$
    });
  }

  getDefaultStateMatcher(): StateMatcher {
    return (control, formGroup) => control.invalid;
  }

  getDefaultErrorsDescription(): any {
    return {
      "required" : "Field is required",
      "min" : "Field should be not less than 0"
    };
  }

  mapErrors() : string {
    if(this.stateMatcher(this.formControl, this.form)) {
      let resultString = '';
      for(let key in this.formControl.errors) {
        resultString += this.errorsDescription[key];
      }

      this.element.classList.add("appControlErrorClass");
      return resultString;
      
    }

    this.element.classList.remove("appControlErrorClass");
    return "";
  }

}


