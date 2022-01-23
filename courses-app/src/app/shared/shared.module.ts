import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const componentsArray: Array<any> = [];


@NgModule({
  declarations: componentsArray,
  imports: [
    CommonModule
  ],
  exports: componentsArray
})
export class SharedModule { }
