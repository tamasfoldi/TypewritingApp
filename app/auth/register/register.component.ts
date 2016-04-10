import { Component, OnInit } from "angular2/core";
import { RouterLink } from "angular2/router";
import { AuthService, User } from "../auth.service";
import { FormBuilder, ControlGroup, Control, Validators } from "angular2/common";

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

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.username = this._formBuilder.control("asdf", Validators.required);
    this.email = this._formBuilder.control("asdf@gmail.com", Validators.compose([Validators.required, this.isValidEmail]));
    this.password = this._formBuilder.control("asdfasdf", Validators.required);
    this.registerForm = this._formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  register(): void {
    let user: User = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
    this._authService.register(user);
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