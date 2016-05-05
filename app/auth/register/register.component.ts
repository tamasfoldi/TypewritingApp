import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { User } from "../../user/user.service";
import { FormBuilder, ControlGroup, Control, Validators } from "@angular/common";
import { CapitalizeFirstPipe } from "../../util/capitalize-first.pipe";

@Component({
  moduleId: module.id,
  selector: "tpw-register",
  templateUrl: "register.component.html",
  directives: [ROUTER_DIRECTIVES],
  pipes: [CapitalizeFirstPipe]
})
export class RegisterComponent implements OnInit {

  username: Control;
  email: Control;
  password: Control;
  registerForm: ControlGroup;

  responseError: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

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
    let user: User = new User();
    user.username = this.username.value;
    user.email = this.email.value;
    user.password = this.password.value;
    this._authService.register(user)
      .map(rsp => rsp.json())
      .subscribe((response) => { // ✔ error handling @done ( April 13th 2016, 8:44:57 pm )
        this._router.navigate(["Login"]);
      }, (error) => {
        this.responseError = JSON.parse(error._body).message;  // ✔ modify error handling. @done ( April 14th 2016, 8:23:21 am )
      }, () => {
        this._authService.login(user)
          .map(rsp => rsp.json())
          .subscribe((data: any) => { // ✔ first capitalizer pipe @done ( April 14th 2016, 8:25:50 am )
            this._authService.handleSuccessLogin(data, user);
            this._router.navigate(["Game"]);
          });
      });

  }

  reset(): void {
    this.username.updateValue("");
    this.email.updateValue("");
    this.password.updateValue("");
  }

  isValidEmail(control: Control): {invalidEmail: boolean} {
    let emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegexp.test(control.value) ? null : { invalidEmail: true };
  }
}