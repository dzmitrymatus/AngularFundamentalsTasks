import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';



const componentsArray: Array<any> = [
  Components.ButtonComponent,
  Components.HeaderComponent,
  Components.InfoComponent,
  Components.SearchComponent
];


@NgModule({
  declarations: componentsArray,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [...componentsArray, CommonModule, FontAwesomeModule]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
 }
