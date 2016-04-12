import { Component, OnInit } from "angular2/core";
import { RouterLink, Router } from "angular2/router";
import { AuthService, User, Auth0Response } from "../auth.service";
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

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.username = this._formBuilder.control("", Validators.required);
    this.password = this._formBuilder.control("", Validators.required);
    this.loginForm = this._formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  login(): void {
    let user: User = {
      username: this.username.value,
      password: this.password.value
    }
    this._authService.login(user).subscribe((data: any) => { // ☐ error handling 
      localStorage.setItem("id_token", data.id_token);
      this._router.parent.navigate(["../Game"]);
    });
  }

  reset(): void {
    this.username.updateValue("");
    this.password.updateValue("");
  }

}