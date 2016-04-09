import { Component, OnInit } from "angular2/core";
import { RouterLink } from "angular2/router";
import { FormBuilder, ControlGroup, Control, Validators } from "angular2/common";

@Component({
  selector: "tpw-login",
  templateUrl: "app/auth/login/login.component.html",
  directives: [RouterLink]
})
export class LoginComponent implements OnInit {

  username: Control;
  password: Control;
  loginForm: ControlGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.username = this._formBuilder.control("", Validators.required);
    this.password = this._formBuilder.control("", Validators.required);
    this.loginForm = this._formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  login(): void {
    this.reset();
  }

  reset(): void {
    this.username.updateValue("");
    this.password.updateValue("");
  }

}