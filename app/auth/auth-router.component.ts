import { Component } from "angular2/core";
import { RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate } from "angular2/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";
import { appInjector } from "../app-injector";
import { tokenNotExpired } from "angular2-jwt/angular2-jwt";



@Component({
  selector: "tpw-auth",
  templateUrl: "app/auth/auth-router.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/login", name: "Login", component: LoginComponent, useAsDefault: true },
  { path: "/register", name: "Register", component: RegisterComponent },
  { path: "...", name: "Game", component: IngameRouterComponent }
])
@CanActivate((next, prev) => {
  if(!tokenNotExpired()) {
    return true;
  } else {
    appInjector().get(Router).navigate(["Game"]);
    return false;
  }
})
export class AuthRouterComponent { }