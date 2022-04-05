import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
