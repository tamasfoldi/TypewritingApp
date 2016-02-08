import {Component, ViewChildren} from "angular2/core";
import {MenuLessonComponent} from "./menu-lesson/menu-lesson.component";

@Component({
  directives: [MenuLessonComponent],
  selector: "tpw-menu",
  templateUrl: "app/menu/menu.html"
})
export class MenuComponent {
  @ViewChildren (MenuLessonComponent)
  menuLessonComponents: Array<MenuLessonComponent>;
  @ViewChildren (MenuComponent)
  menuComponents: Array<MenuComponent>;
}
