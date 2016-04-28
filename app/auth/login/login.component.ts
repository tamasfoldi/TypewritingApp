import { Component, OnInit } from "angular2/core";
import { RouterLink, Router } from "angular2/router";
import { AuthService, Auth0Response } from "../auth.service";
import { User } from "../../user/user.service";
import { FormBuilder, ControlGroup, Control, Validators } from "angular2/common";

@Component({
  selector: "tpw-login",
  templateUrl: "app/auth/login/login.component.html",
  directives: [RouterLink]
})
export class LoginComponent implements OnInit {

  email: Control;
  password: Control;
  loginForm: ControlGroup;

  responseError: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.email = this._formBuilder.control("", Validators.required);
    this.password = this._formBuilder.control("", Validators.required);
    this.loginForm = this._formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  login(): void {
    let user: User = new User();
    user.email = this.email.value;
    user.password = this.password.value;
    this._authService.login(user)
      .map(rsp => rsp.json())
      .subscribe((data: any) => { // ✔ error handling  @done ( April 13th 2016, 9:19:25 pm )
        this._authService.handleSuccessLogin(data, user);
        this._router.parent.navigate(["../Game"]);
      }, (error) => {
        this.responseError = JSON.parse(error._body).error_description;
      });
  }

  reset(): void {
    this.email.updateValue("");
    this.password.updateValue("");
  }

}