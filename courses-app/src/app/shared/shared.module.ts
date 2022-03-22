import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Components from '@shared/components';
import * as Directives from '@shared/directives';
import * as Pipes from '@shared/pipes';
import * as Validators from '@shared/validators';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { validateEmail, validateLatinLettersAndNumbersOnly } from '@shared/validators';
import { RouterModule } from '@angular/router';
export { validateEmail, validateLatinLettersAndNumbersOnly} 

const componentsArray: Array<any> = [
  Components.ButtonComponent,
  Components.HeaderComponent,
  Components.InfoComponent,
  Components.SearchComponent,
  Components.ConfirmModalWindowComponent,
  Directives.InputTypeTogglerDirective,
  Directives.ControlErrorDirective,
  Pipes.JoinPipe,
  Pipes.DurationPipe,
  Pipes.CreationDatePipe,
  Validators.EmailValidatorDirective,
  Validators.LatinLettersAndNumbersValidatorDirective
];

@NgModule({
  declarations: componentsArray,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ...componentsArray,
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
 }
