import {Component} from "angular2/core";
import {FormBuilder, Control, ControlGroup, Validators} from "angular2/common";
import {DisplayErrorComponent} from "../errors/display.component";

@Component({
  directives: [DisplayErrorComponent],
  selector: "tpw-register-form",
  templateUrl: "app/register/register-form.html",
  viewProviders: [FormBuilder]
})
export class RegisterFormComponent {
  registerForm: ControlGroup;
  username: Control;
  password: Control;
  email: Control;

  constructor(fb: FormBuilder) {
    this.username = fb.control("", Validators.compose([Validators.required]));
    this.password = fb.control("", Validators.compose([Validators.required]));
    this.email = fb.control("", Validators.compose([Validators.required, this.isValidEmail]));

    this.registerForm = fb.group({
      username: this.username,
      password: this.password,
      email: this.email
    });

  }

  isValidEmail(control: Control) {
    if (!control.value) {
      return null;
    }

    let regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regexp.test(control.value) ? null : {invalidMail: true};
  }

  register() {
    return this.registerForm.value;
  }
}
