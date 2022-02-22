import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import * as Directives from './directives/index';
import * as Pipes from './pipes/index';
import * as Validators from './validators/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { validateEmail } from './validators/index';
export { validateEmail } 
import { validateValueContainsLatinLettersAndNumbersOnly } from './validators/index';
export { validateValueContainsLatinLettersAndNumbersOnly }

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
    ReactiveFormsModule
  ],
  exports: [
    ...componentsArray,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
 }
