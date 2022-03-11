import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedGuard } from './guards/authorized.guard';
import { NotAuthorizedGuard } from './guards/not-authorized.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard]
})
export class AuthModule { }
