import {Component} from "angular2/core";
import {HeaderComponent} from "../header/header.component";
import {MenuComponent} from "../menu/menu.component";

@Component({
  directives: [HeaderComponent, MenuComponent],
  selector: "tpw-main",
  templateUrl: "app/main/main.html"
})
export class MainComponent {


}
