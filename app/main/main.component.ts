import {Component, ViewChild} from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";
import {HeaderComponent} from "../header/header.component";
import {MenuComponent} from "../menu/menu.component";
import {LoginFormComponent} from "../login/login-form.component";
import {RegisterFormComponent} from "../register/register-form.component";

@Component({
  directives: [ROUTER_DIRECTIVES, HeaderComponent, MenuComponent],
  providers: [ROUTER_PROVIDERS],
  selector: "tpw-main",
  templateUrl: "app/main/main.html"
})
@RouteConfig([
  { path: "/login", name: "Login", component: LoginFormComponent, useAsDefault: true },
  { path: "/register", name: "Register", component: RegisterFormComponent }
])
export class MainComponent {
  @ViewChild(HeaderComponent)
  headerComponent: HeaderComponent;
  @ViewChild(MenuComponent)
  menuComponent: MenuComponent;

}
