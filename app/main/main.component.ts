import {Component, ViewChild} from "angular2/core";
import {HeaderComponent} from "../header/header.component";
import {MenuComponent} from "../menu/menu.component";
import {LoginFormComponent} from "../login/login-form.component";
import {RegisterFormComponent} from "../register/register-form.component";

@Component({
  directives: [HeaderComponent, MenuComponent, LoginFormComponent, RegisterFormComponent],
  selector: "tpw-main",
  templateUrl: "app/main/main.html"
})
export class MainComponent {
  @ViewChild(HeaderComponent)
  headerComponent: HeaderComponent;
  @ViewChild(MenuComponent)
  menuComponent: MenuComponent;

}
