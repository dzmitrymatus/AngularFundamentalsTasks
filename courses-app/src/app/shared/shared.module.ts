import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';


const componentsArray: Array<any> = [
  Components.ButtonComponent,
  Components.HeaderComponent,
  Components.InfoComponent,
  Components.SearchComponent
];


@NgModule({
  declarations: componentsArray,
  imports: [
    CommonModule
  ],
  exports: componentsArray
})
export class SharedModule { }
