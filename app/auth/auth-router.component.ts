import { Component } from "@angular/core";
import { Routes, Router, ROUTER_DIRECTIVES } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { IngameRouterComponent } from "../ingame-router/ingame-router.component";
import { appInjector } from "../app-injector";
import { tokenNotExpired } from "angular2-jwt/angular2-jwt";



@Component({
  moduleId: module.id,
  selector: "tpw-auth",
  templateUrl: "auth-router.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
])
export class AuthRouterComponent { }