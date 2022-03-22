import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Components from './components/index';
import * as Directives from './directives/index';
import * as Pipes from './pipes/index';
import * as Validators from './validators/index';


import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { validateEmail, validateLatinLettersAndNumbersOnly } from './validators/index';
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
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ...componentsArray,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
 }
