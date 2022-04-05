import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authStateFacade: AuthStateFacade) { }
  
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.valid)
    {
      this.authStateFacade.login(form.value);
    }
  }

}
