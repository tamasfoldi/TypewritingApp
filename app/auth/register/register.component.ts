import { Component, OnInit } from "angular2/core";
import { RouterLink } from "angular2/router";

import {FormBuilder, ControlGroup, Control, Validators} from "angular2/common";

@Component({
  selector: "tpw-register",
  templateUrl: "app/auth/register/register.component.html",
  directives: [RouterLink]
})
export class RegisterComponent implements OnInit {

  username: Control;
  email: Control;
  password: Control;
  registerForm: ControlGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.username = this._formBuilder.control("", Validators.required);
    this.email = this._formBuilder.control("", Validators.compose([Validators.required, this.isValidEmail]));
    this.password = this._formBuilder.control("", Validators.required);
    this.registerForm = this._formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  register(): void {
    this.reset();
  }

  reset(): void {
    this.username.updateValue("");
    this.email.updateValue("");
    this.password.updateValue("");
  }

  isValidEmail(control: Control) {
    let emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegexp.test(control.value) ? null : { invalidEmail: true };
  }
}