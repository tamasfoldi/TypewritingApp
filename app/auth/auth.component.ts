import { Component, OnInit } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";

@Component({
  selector: "tpw-auth",
  templateUrl: "app/auth/auth.component.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [AuthService]
})
@RouteConfig([
  { path: "/login", as: "Login", component: LoginComponent, useAsDefault: true },
  { path: "/register", as: "Register", component: RegisterComponent }
])
export class AuthComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}