import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthModel } from 'src/app/auth/services/auth.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { validateEmail } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm : FormGroup;

  constructor(private authService: AuthService,
    private router: Router) {
    this.registrationForm = new FormGroup({
      "name" : new FormControl("", [Validators.required, Validators.minLength(6)]),
      "email" : new FormControl("", [Validators.required, validateEmail]),
      "password" : new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registrationForm.controls['name'];
  }

  get email() {
    return this.registrationForm.controls['email'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  onSubmit() {
    this.authService.register(this.registrationForm.value)
      .subscribe((data: UserAuthModel) => {
          this.authService.login(data)
            .subscribe(() => this.router.navigateByUrl("/"));
        }
      );
  }
}
