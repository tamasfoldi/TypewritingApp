import {Component} from "angular2/core";
import {FormBuilder, Control, ControlGroup, Validators} from "angular2/common";
import {DisplayErrorComponent} from "../errors/display.component";

@Component({
  directives: [DisplayErrorComponent],
  selector: "tpw-login-form",
  templateUrl: "app/login/login-form.html",
  viewProviders: [FormBuilder]
})
export class LoginFormComponent {
  loginForm: ControlGroup;
  username: Control;
  password: Control;
  rememberMe: Control;

  constructor(fb: FormBuilder) {
    this.username = fb.control("", Validators.compose([Validators.required]));
    this.password = fb.control("", Validators.compose([Validators.required]));
    this.rememberMe = fb.control(false);
    this.loginForm = fb.group({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    });

  }

  login() {

    return this.loginForm.value;
  }
}
