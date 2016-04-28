import { Component, OnInit } from "angular2/core";
import { RouterLink, Router } from "angular2/router";
import { AuthService } from "../auth.service";
import { AuthUser as User } from "../../user/user.service";
import { FormBuilder, ControlGroup, Control, Validators } from "angular2/common";
import { CapitalizeFirstPipe } from "../../util/capitalize-first.pipe";

@Component({
  selector: "tpw-register",
  templateUrl: "app/auth/register/register.component.html",
  directives: [RouterLink],
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
    this.username = this._formBuilder.control("test", Validators.required);
    this.email = this._formBuilder.control("test@test.com", Validators.compose([Validators.required, this.isValidEmail]));
    this.password = this._formBuilder.control("test12345", Validators.required);
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
    this._authService.register(user)
    .map(rsp => rsp.json())
    .subscribe((response) => { // ✔ error handling @done ( April 13th 2016, 8:44:57 pm )
      this._router.parent.navigate(["Login"]); // ✔ auto login @done ( April 13th 2016, 8:53:27 pm )
    }, (error) => {
        this.responseError = JSON.parse(error._body).message;  // ✔ modify error handling. @done ( April 14th 2016, 8:23:21 am )
    }, () => {
      this._authService.login(user)
      .map(rsp => rsp.json())
      .subscribe((data: any) => { // ✔ first capitalizer pipe @done ( April 14th 2016, 8:25:50 am )
        this._authService.handleSuccessLogin(data, user);
        this._router.parent.navigate(["../Game"]);
      });
    });

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