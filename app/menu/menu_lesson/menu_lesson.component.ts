import {Component} from "angular2/core";
import {MenuLessonService} from "./menu_lesson.service";
import {MenuLesson} from "../../../DTO/MenuLesson";

@Component({
  selector: "tpw-menu-lesson",
  templateUrl: "app/menu/menu.html"
})
export class MenuLessonComponent {
  lessonMenu: Array<MenuLesson>;

  constructor(menuLessonService: MenuLessonService) {
    this.lessonMenu = menuLessonService.query();
  }

}
