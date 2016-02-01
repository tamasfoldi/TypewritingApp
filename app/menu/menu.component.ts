import {Component} from "angular2/core";
import {MenuLessonComponent} from "./menu_lesson/menu_lesson.component";

@Component({
  directives: [MenuLessonComponent],
  selector: "tpw-menu",
  templateUrl: "app/menu/menu.html"
})
export class MenuComponent {
}
