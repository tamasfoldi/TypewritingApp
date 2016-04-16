import { Component } from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "angular2/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";

@Component({
  selector: "tpw-auth",
  templateUrl: "app/auth/auth.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/login", as: "Login", component: LoginComponent, useAsDefault: true },
  { path: "/register", as: "Register", component: RegisterComponent },
  { path: "...", as: "Game", component: IngameRouterComponent }
])
export class AuthComponent { }